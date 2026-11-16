'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Component, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/* ───────────────────────── geometry ───────────────────────── */

/** A folded paper plane, nose along +Z so Object3D.lookAt() points it along its flight path. */
function usePlaneGeometries() {
  return useMemo(() => {
    const N = new THREE.Vector3(0, 0, 2.1); // nose
    const C = new THREE.Vector3(0, 0.16, -1.15); // centre fold (back)
    const L = new THREE.Vector3(1.45, 0.34, -1.45); // left wing tip
    const R = new THREE.Vector3(-1.45, 0.34, -1.45); // right wing tip
    const K = new THREE.Vector3(0, -0.62, -1.1); // keel bottom
    const tri = (pts: THREE.Vector3[]) => {
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      g.computeVertexNormals();
      return g;
    };
    return {
      wings: tri([N, C, L, N, R, C]),
      keel: tri([N, K, C]),
    };
  }, []);
}

/* ───────────────────────── environment ───────────────────────── */

function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    // Procedural studio lighting: no HDR download needed.
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/* ───────────────────────── objects ───────────────────────── */

const pointer = { x: 0, y: 0 };

function PaperPlane({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { wings, keel } = usePlaneGeometries();
  const t = useRef(0.6);
  const history = useRef<THREE.Vector3[]>([]);
  const TRAIL = 70;
  const trailGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TRAIL * 3), 3));
    g.setDrawRange(0, 0);
    return g;
  }, []);
  const trailLine = useMemo(() => new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ color: '#2aabee', transparent: true, opacity: 0.45 })), [trailGeo]);

  const pathAt = (s: number, out = new THREE.Vector3()) =>
    out.set(Math.sin(s) * 1.95, Math.sin(s * 2) * 1.05 + 0.25, Math.cos(s) * 2.2 - 0.3);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    if (animate) t.current += Math.min(delta, 0.05) * 0.32;
    const pos = pathAt(t.current);
    const ahead = pathAt(t.current + 0.04);
    g.position.copy(pos);
    g.lookAt(ahead);
    // bank into turns
    g.rotateZ(-Math.cos(t.current) * 0.5);

    if (animate) {
      history.current.push(pos.clone());
      if (history.current.length > TRAIL) history.current.shift();
      const attr = trailGeo.getAttribute('position') as THREE.BufferAttribute;
      history.current.forEach((p, i) => attr.setXYZ(i, p.x, p.y, p.z));
      attr.needsUpdate = true;
      trailGeo.setDrawRange(0, history.current.length);
      trailGeo.computeBoundingSphere();
    }
  });

  const planeMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#2aabee', metalness: 0.15, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.15, side: THREE.DoubleSide, flatShading: true }),
    [],
  );
  const keelMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#1673c4', metalness: 0.2, roughness: 0.3, clearcoat: 1, side: THREE.DoubleSide, flatShading: true }),
    [],
  );

  return (
    <>
      <group ref={group} scale={0.55}>
        <mesh geometry={wings} material={planeMat} />
        <mesh geometry={keel} material={keelMat} />
      </group>
      <primitive object={trailLine} />
    </>
  );
}

function GlossySphere({ position, radius, color, speed = 1, phase = 0 }: { position: [number, number, number]; radius: number; color: string; speed?: number; phase?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8 * speed + phase) * 0.18;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[radius, 48, 48]} />
      <meshPhysicalMaterial color={color} metalness={0.1} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} />
    </mesh>
  );
}

function Orbits({ animate }: { animate: boolean }) {
  const dots = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (dots.current && animate) dots.current.rotation.z += d * 0.25;
  });
  return (
    <group rotation={[Math.PI / 2.35, 0.25, 0]} position={[0, 0.1, -0.4]}>
      <mesh>
        <torusGeometry args={[2.95, 0.012, 16, 200]} />
        <meshBasicMaterial color="#7fcff5" transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[0, 0, 0.6]} scale={0.78}>
        <torusGeometry args={[2.95, 0.01, 16, 200]} />
        <meshBasicMaterial color="#b9a9ff" transparent opacity={0.5} />
      </mesh>
      <group ref={dots}>
        {[0, 2.1, 4.2].map((a) => (
          <mesh key={a} position={[Math.cos(a) * 2.95, Math.sin(a) * 2.95, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#2aabee" emissiveIntensity={1.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += (pointer.x * 0.35 - g.rotation.y) * 0.05;
    g.rotation.x += (-pointer.y * 0.18 - g.rotation.x) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

/* ───────────────────────── canvas ───────────────────────── */

class GLBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Decorative WebGL scene for the hero. Pauses when off-screen, renders a single still frame
 * for reduced-motion users, and renders nothing if WebGL is unavailable.
 */
export default function PlaneScene({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const animate = !reduce;
  return (
    <div ref={wrap} className={className} aria-hidden="true">
      <GLBoundary>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.6, 8.5], fov: 36 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
          frameloop={visible && animate ? 'always' : 'demand'}
        >
          <StudioEnvironment />
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 5]} intensity={1.4} />
          <Rig>
            <Orbits animate={animate} />
            <PaperPlane animate={animate} />
            <GlossySphere position={[-2.35, 0.7, -1.6]} radius={0.34} color="#6e56f7" phase={1} />
            <GlossySphere position={[1.9, -2.15, -1.2]} radius={0.42} color="#2aabee" speed={0.8} />
            <GlossySphere position={[2.2, 2.3, -2.2]} radius={0.26} color="#22c3ee" speed={1.3} phase={2} />
            <GlossySphere position={[-1.9, 2.4, -1.4]} radius={0.18} color="#1673c4" speed={1.1} phase={3} />
          </Rig>
        </Canvas>
      </GLBoundary>
    </div>
  );
}
