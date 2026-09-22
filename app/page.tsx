"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "@/components/Scene";
import { SceneErrorBoundary, SceneLoading, SceneUnavailable } from "@/components/SceneStatus";
import { blenderToThreeCoords } from "@/utils/blender";

const cameraPos = blenderToThreeCoords([0.031287, -1.31666, 1.11133]);
export default function Home() {
  return (
    <main className="w-screen h-screen bg-black">
      <SceneErrorBoundary>
        <Canvas
          shadows="soft"
          dpr={[1, 2]}
          gl={{ antialias: true }}
          camera={{ position: cameraPos, fov: 50 }}
          fallback={<SceneUnavailable unsupported />}
        >
          <color attach="background" args={["#020101"]} />
          <Suspense fallback={<SceneLoading />}>
            <Scene />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </main>
  );
}
