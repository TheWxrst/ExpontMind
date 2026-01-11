import * as THREE from "three";
import { JSX, useRef, useState, useEffect } from "react";
import { MeshTransmissionMaterial, useGLTF, Center } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    path1: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

const materialProps = {
  thickness: 1,
  roughness: 0,
  transmission: 1,
  ior: 1.2,
  chromaticAberration: 0.08,
  backside: true,
};

// Responsive scale based on viewport width
const getResponsiveScale = () => {
  if (typeof window === "undefined") return 1.5;
  const width = window.innerWidth;
  if (width < 480) return 1.0;
  if (width < 640) return 1.2;
  if (width < 768) return 1.35;
  return 1.5;
};

export function Logo(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/Logo.glb") as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const targetRotationZ = useRef(0);
  const [scale, setScale] = useState(getResponsiveScale);

  // Handle resize for responsive scale
  useEffect(() => {
    const handleResize = () => setScale(getResponsiveScale());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const windowHeight = window.innerHeight;
    // Scroll хийх бүрт тасралтгүй rotate хийнэ (хязгааргүй)
    const scrollProgress = window.scrollY / (windowHeight * 3);

    targetRotationZ.current = Math.PI + scrollProgress * Math.PI;

    // Smooth interpolation
    groupRef.current.rotation.z +=
      (targetRotationZ.current - groupRef.current.rotation.z) * 0.05;
  });

  return (
    <Center>
      <group
        ref={groupRef}
        {...props}
        dispose={null}
        scale={props.scale ?? scale}
        rotation={props.rotation ?? [-Math.PI / 2, 0, 0]}
      >
        <mesh {...nodes.path1}>
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
      </group>
    </Center>
  );
}

useGLTF.preload("/Logo.glb");
