import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { Group } from "three";

function RobotModel(): React.JSX.Element {
  const { scene } = useGLTF("/models/robot_bg.glb");
  const modelRef = useRef<Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={1.5} />;
}

export function RobotBgCanvas(): React.JSX.Element {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-25">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <pointLight position={[-4, 4, -4]} intensity={2} color="#0ea5e9" />
        <Suspense fallback={null}>
          <Center>
            <RobotModel />
          </Center>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default RobotBgCanvas;
