"use client";

import type { ScreenName } from "@/utils/screens";


import { Html, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { blenderToThreeCoords } from "@/utils/blender";
import * as THREE from "three";
import LandAnimation from "./LandAnimation";
import BinaryGrid from "./Screens/BinaryGrid";
import AboutScreen from "./Screens/AboutScreen";
import ContactScreen from "./Screens/ContactScreen";
import Project from "./Screens/Project";
const MODEL = "/models/tvnolight.glb";

const PointPos = blenderToThreeCoords([0.22319, -0.087753, 0.73635]);
useGLTF.preload(MODEL);

type Props = {
  screen: ScreenName;
  setScreen: (screen: ScreenName) => void;
};
export default function Monitor({ screen, setScreen }: Props) {
  const [isRotating, setIsRotating] = useState(false);
  const [pendingScreen, setPendingScreen] = useState<ScreenName | null>(null);

  function handleScreenChange(newScreen: ScreenName) {
    if (isRotating || newScreen === screen) return;
    setPendingScreen(newScreen);
    setIsRotating(true);
  }

  const gltf = useGLTF(MODEL) as Exclude<ReturnType<typeof useGLTF>, unknown[]> & {
    nodes: Record<string, THREE.Mesh>;
  };
  const renderer = useThree((state) => state.gl);
  const screenMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const monitorRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!monitorRef.current) return;

    if (isRotating) {
      const rotation = monitorRef.current.rotation.y;
      const targetRotation = 2 * Math.PI;
      const speed = 0.02;

      monitorRef.current.rotation.y = THREE.MathUtils.lerp(
        rotation,
        targetRotation,
        speed
      );

      if (rotation > Math.PI && pendingScreen) {
        setScreen(pendingScreen);
        setPendingScreen(null);
      }

      if (Math.abs(monitorRef.current.rotation.y - targetRotation) < 0.01) {
        monitorRef.current.rotation.y = 0;
        setIsRotating(false);
      }
    }
  });

  useFrame(({ clock }) => {
    if (!screenMaterial.current) return;

    const t = clock.getElapsedTime();

    const base = 1.4;
    const pulse = Math.sin(t * 100) * 0.2;
    const jitter = (Math.random() - 0.5) * 0.15;
    const flash = Math.random() < 0.02 ? 1.5 : 0;

    screenMaterial.current.emissiveIntensity = base + pulse + jitter + flash;
  });

  useEffect(() => {
    const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    // Nodes can be reparented out of the loaded scene by React Three Fiber.
    Object.values(gltf.nodes).forEach((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of materials) {
        if (!(material instanceof THREE.MeshStandardMaterial)) continue;
        for (const texture of [material.map, material.normalMap, material.roughnessMap, material.metalnessMap]) {
          if (texture && texture.anisotropy !== anisotropy) {
            texture.anisotropy = anisotropy;
            texture.needsUpdate = true;
          }
        }
      }
    });
  }, [gltf.nodes, renderer]);

  const { nodes } = gltf;

  return (
    <>
      <primitive object={nodes.Table} />
      <group>
        <LandAnimation
          fromY={10}
          toY={0}
          speed={0.006}
          fromRotationY={Math.PI * 6}
          toRotationY={0}
        >
          <group ref={monitorRef}>
            <primitive object={nodes.TV} castShadow />

            <mesh
              geometry={nodes.Screen.geometry}
              position={nodes.Screen.position}
            >
              <meshStandardMaterial
                ref={screenMaterial}
                color="#0a0f0a"
                emissive="#001c0f"
                emissiveIntensity={1.4}
                metalness={0.05}
                roughness={0.45}
                side={THREE.FrontSide}
              />
              <Html transform distanceFactor={1} occlude>
                <div className="transition-opacity duration-300 ease-in-out">
                  {screen === "home" && (
                    <BinaryGrid setScreen={handleScreenChange} />
                  )}
                  {screen === "about" && (
                    <AboutScreen setScreen={handleScreenChange} />
                  )}
                  {screen === "contact" && (
                    <ContactScreen setScreen={handleScreenChange} />
                  )}
                  {screen === "projects" && (
                    <Project setScreen={handleScreenChange} />
                  )}
                </div>
              </Html>
            </mesh>
            {[
              "Curve",
              "Curve001",
              "Curve002",
              "Curve003",
              "Curve004",
              "Curve005",
              "Curve006",
              "Curve007",
              "Curve008",
              "Curve009",
              "Curve010",
              "Curve011",
            ].map((name) => {
              const mesh = nodes[name];
              return (
                <mesh
                  key={name}
                  geometry={mesh.geometry}
                  position={mesh.position}
                  rotation={mesh.rotation}
                  scale={mesh.scale}
                  castShadow
                  receiveShadow
                >
                  <primitive object={mesh.material} attach="material" />
                </mesh>
              );
            })}
            <pointLight
              position={PointPos}
              intensity={0.8}
              color="#FF2E31"
              distance={0.017}
            />
          </group>
        </LandAnimation>
      </group>
    </>
  );
}
