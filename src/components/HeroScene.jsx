import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Torus } from '@react-three/drei';
import * as THREE from 'three';

function TechCore() {
  const group = useRef(null);
  const core = useRef(null);
  const elapsed = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    elapsed.current += delta;
    const pointer = state.pointer;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointer.y * 0.2, 2.2, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.32 + elapsed.current * 0.06, 2.2, delta);
    if (core.current) core.current.rotation.z += delta * 0.12;
  });

  return (
    <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.22}>
      <group ref={group}>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.78, 1]} />
          <meshPhysicalMaterial
            color="#687d37"
            emissive="#293a12"
            emissiveIntensity={0.18}
            metalness={0.84}
            roughness={0.29}
            clearcoat={0.72}
            clearcoatRoughness={0.2}
            flatShading
          />
        </mesh>
        <mesh scale={1.025}>
          <icosahedronGeometry args={[0.78, 1]} />
          <meshBasicMaterial color="#e6ffc0" wireframe transparent opacity={0.15} />
        </mesh>
        <Torus args={[1.16, 0.009, 8, 120]} rotation={[0.78, 0.35, -0.34]}>
          <meshBasicMaterial color="#dfff9c" transparent opacity={0.55} />
        </Torus>
        <Torus args={[1.43, 0.006, 8, 120]} rotation={[-0.72, 0.48, 0.28]}>
          <meshBasicMaterial color="#a5d748" transparent opacity={0.32} />
        </Torus>
        {[[-1.18, 0.12, 0.04], [0.84, 0.88, 0.24], [0.38, -1.12, -0.08]].map((position, index) => (
          <mesh key={index} position={position}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial color="#eaffbd" emissive="#b6f64f" emissiveIntensity={0.75} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 38 }}
      dpr={[1, 1.35]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      fallback={<div className="hero-scene-fallback" />}
      aria-hidden="true"
    >
      <ambientLight intensity={0.82} />
      <pointLight position={[2.6, 2.4, 3.4]} intensity={1.45} color="#e9ffc1" />
      <pointLight position={[-2.5, -1.4, 2]} intensity={0.8} color="#a6d74a" />
      <TechCore />
      <Sparkles count={25} scale={3.35} size={1.4} speed={0.16} opacity={0.46} color="#dfff9c" />
    </Canvas>
  );
}
