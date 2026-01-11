import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { ThreeElements } from "@react-three/fiber";
import { useState, useEffect } from "react";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
    Object_3: THREE.Mesh;
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_6: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshPhysicalMaterial;
  };
};

// Get responsive config for mobile (xOffset and scale)
const getResponsiveConfig = () => {
  if (typeof window === "undefined") return { xOffset: 0, scale: 32 };
  const w = window.innerWidth;
  if (w < 480) return { xOffset: 35, scale: 22 };
  if (w < 640) return { xOffset: 40, scale: 26 };
  if (w < 768) return { xOffset: 50, scale: 28 };
  return { xOffset: 0, scale: 32 };
};

export function Mountain(props: ThreeElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/mountain.glb"
  ) as unknown as GLTFResult;

  const [config, setConfig] = useState({ xOffset: 0, scale: 32 });

  useEffect(() => {
    const updateConfig = () => setConfig(getResponsiveConfig());
    updateConfig();
    window.addEventListener("resize", updateConfig);
    return () => window.removeEventListener("resize", updateConfig);
  }, []);

  return (
    <group
      {...props}
      dispose={null}
      scale={config.scale}
      rotation={[0.75, -1.5, 0]}
      position={[50 + config.xOffset, 0, -120]}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/mountain.glb");
