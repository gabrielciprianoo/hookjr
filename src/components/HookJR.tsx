import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export default function HookJR() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const eyeLeft = useRef<THREE.Mesh>(null);
  const eyeRight = useRef<THREE.Mesh>(null);

  // Animaciones
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Escalado latido
    if (groupRef.current) {
      const scale = 1 + Math.sin(t * 3) * 0.01;
      groupRef.current.scale.set(scale, scale, scale);
    }

    // Cabeza flotando y girando
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      headRef.current.position.y = 1.85 + Math.sin(t * 1.5) * 0.02;
    }

    // Cuerpo flotando
    if (bodyRef.current) {
      bodyRef.current.position.y = 1 + Math.sin(t) * 0.02;
    }

    // Brazos en onda
    const wave = Math.sin(t * 2) * 0.3;
    if (leftArmRef.current) leftArmRef.current.rotation.z = wave;
    if (rightArmRef.current) rightArmRef.current.rotation.z = -wave;

    // Ojos brillando animadamente
    if (eyeLeft.current && eyeRight.current) {
      const blink = 1.5 + Math.sin(t * 4) * 0.3;
      (eyeLeft.current.material as THREE.MeshStandardMaterial).emissiveIntensity = blink;
      (eyeRight.current.material as THREE.MeshStandardMaterial).emissiveIntensity = blink;
    }
  });

  // Material estilo holograma
  const holoMaterial = new THREE.MeshStandardMaterial({
    color: "#00ffff",
    wireframe: true,
    emissive: "#00ffff",
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.4,
  });

  return (
   <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Cabeza */}
      <RoundedBox
        ref={headRef}
        args={[1.2, 0.7, 0.6]}
        radius={0.2}
        smoothness={4}
        position={[0, 1.85, 0]}
      >
        <primitive object={holoMaterial} attach="material" />
      </RoundedBox>

      {/* Ojitos grandes */}
      <mesh ref={eyeLeft} position={[-0.3, 1.93, 0.37]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="white" emissive="white" />
      </mesh>
      <mesh ref={eyeRight} position={[0.3, 1.93, 0.37]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="white" emissive="white" />
      </mesh>

      {/* Mejillas */}
      <mesh position={[-0.4, 1.84, 0.35]}>
        <circleGeometry args={[0.04, 32]} />
        <meshStandardMaterial color="#ff66cc" emissive="#ff66cc" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0.4, 1.84, 0.35]}>
        <circleGeometry args={[0.04, 32]} />
        <meshStandardMaterial color="#ff66cc" emissive="#ff66cc" emissiveIntensity={1.2} />
      </mesh>

      {/* Sonrisa (torus rotado) */}
      <mesh position={[0, 1.75, 0.38]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.06, 0.015, 16, 100, Math.PI]} />
        <meshStandardMaterial color="black" emissive="black" emissiveIntensity={0.6} />
      </mesh>

      {/* Cuerpo */}
      <RoundedBox
        ref={bodyRef}
        args={[0.6, 0.8, 0.4]}
        radius={0.2}
        smoothness={4}
        position={[0, 1, 0]}
      >
        <primitive object={holoMaterial} attach="material" />
      </RoundedBox>

      {/* Brazos */}
      <mesh ref={leftArmRef} position={[-0.6, 0.95, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.3, 12]} />
        <meshStandardMaterial
          color="#00ffff"
          wireframe
          emissive="#00ffff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh ref={rightArmRef} position={[0.6, 0.95, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.3, 12]} />
        <meshStandardMaterial
          color="#00ffff"
          wireframe
          emissive="#00ffff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Antena */}
      <mesh position={[0, 2.3, 0]}>
        <coneGeometry args={[0.05, 0.2, 16]} />
        <meshStandardMaterial
          color="#00ffff"
          wireframe
          emissive="#00ffff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}
