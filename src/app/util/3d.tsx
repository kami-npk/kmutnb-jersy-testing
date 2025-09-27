"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect, useState, useMemo, Suspense } from "react";

// preload โมเดล
useGLTF.preload("/white.glb");
useGLTF.preload("/black.glb");

const ShirtModel = ({
  model,
  setTarget,
  number,
  nametag,
  type,
}: {
  model: "white" | "black";
  setTarget: (v: [number, number, number]) => void;
  number?: string;
  nametag?: string;
  type?: number;
}) => {
  const [nameSize, setNameSize] = useState(0.14);
  const gltf = useGLTF(`/${model}.glb`);
  const ref = useRef<THREE.Object3D>(gltf.scene);

  // โหลดรูปจาก public
  const overlayTexture = useLoader(THREE.TextureLoader, "/ggez.png");

  const scene = useMemo(() => {
    const clone = gltf.scene.clone();
    clone.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = (mesh.material as THREE.Material).clone();
        if ("metalness" in mesh.material) mesh.material.metalness = 0;
        if ("roughness" in mesh.material) mesh.material.roughness = 1;
        mesh.material.needsUpdate = true;
      }
    });
    return clone;
  }, [gltf]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(ref.current!);
    const c = new THREE.Vector3();
    box.getCenter(c);
    setTarget([c.x, c.y, c.z]);
  }, [setTarget]);

  useEffect(() => {
    if (nametag !== undefined) {
      if (nametag.length <= 9) setNameSize(0.14);
      else if (nametag.length <= 15) setNameSize(0.12);
      else setNameSize(0.09);
    }
  }, [nametag]);

  return (
    <group>
      {/* โมเดลเสื้อ */}
      <primitive ref={ref} object={scene} scale={2} />

      {/* Text */}
      {nametag && (
        <Text
          position={[0, 3.12, -0.324]}
          fontSize={nameSize}
          color={model === "white" ? "#150728" : "white"}
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
          font="./PassionOne-Regular.ttf"
        >
          {nametag}
        </Text>
      )}

      {number && type === 2 && (
        <Text
          position={[0, 2.75, -0.324]}
          fontSize={0.7}
          color="#ed1c24"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
          font="./SDVanger.ttf"
          scale={[0.25, 1, 1]}
        >
          {number}
        </Text>
      )}

      {/* รูปจาก public แปะบนเสื้อ หมุนตาม group */}
      {type === 1 && (
        <mesh position={[0, 2.81, -0.321]} scale={0.6} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={overlayTexture} transparent />
        </mesh>
      )}
    </group>
  );
};

type RotatingGroupProps = {
  nametag: string;
  children: React.ReactNode;
};

const RotatingGroup = ({ nametag, children }: RotatingGroupProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [targetRotation, setTargetRotation] = useState(0);
  const [hasRotated, setHasRotated] = useState(false);

  useEffect(() => {
    if (nametag !== "" && !hasRotated) {
      setTargetRotation(Math.PI);
      setHasRotated(true);
    }
  }, [nametag, hasRotated]);

  useFrame(() => {
    if (groupRef.current) {
      const diff = targetRotation - groupRef.current.rotation.y;
      if (Math.abs(diff) > 0.001) {
        groupRef.current.rotation.y += diff * 0.05;
      } else {
        groupRef.current.rotation.y = targetRotation;
      }
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

interface ThreeDSectionProps {
  model: "white" | "black";
  nametag?: string;
  number?: string;
  type?: number;
}

const ThreeDSection = ({ model, nametag = "", number, type }: ThreeDSectionProps) => {
  const [target, setTarget] = useState<[number, number, number]>([0, 0, 0]);

  return (
    <Canvas camera={{ position: [0, 3, 4], fov: 50 }} style={{ width: "100%", height: "100%" }} gl={{ antialias: true }}>
      <color attach="background" args={["#f5f5f5"]} />
      <ambientLight intensity={3} />
      <directionalLight position={[5, 5, 5]} intensity={4} castShadow />

      <Suspense fallback={null}>
        <RotatingGroup nametag={nametag}>
          <ShirtModel model={model} setTarget={setTarget} number={number} nametag={nametag} type={type} />
        </RotatingGroup>
      </Suspense>

      <OrbitControls target={target} enablePan={false} enableRotate enableZoom />
    </Canvas>
  );
};

export default ThreeDSection;
