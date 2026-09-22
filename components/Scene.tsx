"use client";

import type { ScreenName } from "@/utils/screens";


import { useRef, useEffect, useState } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { blenderToThreeCoords } from "@/utils/blender";
import { useThree } from "@react-three/fiber";
import Monitor from "./Monitor";
import * as THREE from "three";
import SceneLights from "@/components/SceneLights";

const CAM_DESKTOP = blenderToThreeCoords([0.071287, -1.04666, 0.98133]);
const CAM_MOBILE = blenderToThreeCoords([0.071287, -1.24666, 0.98133]);
const FOV_DESKTOP = 50;
const FOV_MOBILE = 60;

function useIsMobile(breakpoint = 768) {
  const width = useThree((s) => s.size.width);
  return width < breakpoint;
}


function FixedCamera() {
  const camRef = useRef<THREE.PerspectiveCamera>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!camRef.current) return;

    const pos = isMobile ? CAM_MOBILE : CAM_DESKTOP;
    const fov = isMobile ? FOV_MOBILE : FOV_DESKTOP;

    camRef.current.position.set(...pos);
    camRef.current.fov = fov;
    camRef.current.updateProjectionMatrix();
    camRef.current.lookAt(0.06, 0.96, 0);
  }, [isMobile]);

  return <PerspectiveCamera ref={camRef} makeDefault />;
}

export default function Scene() {
  const [screen, setScreen] = useState<ScreenName>("home");
  return (
    <>
      <FixedCamera />
      <Monitor screen={screen} setScreen={setScreen} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
      <SceneLights screen={screen} />
    </>
  );
}
