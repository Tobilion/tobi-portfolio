import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";

function HeadModel() {
  const { scene } = useGLTF("/models/human_head.glb");
  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current) {
      const targetX = state.pointer.x * 0.4;
      const targetY = state.pointer.y * 0.3;
      
      modelRef.current.rotation.y += (targetX - modelRef.current.rotation.y) * 0.1;
      modelRef.current.rotation.x += (-targetY - modelRef.current.rotation.x) * 0.1;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={1.2} />;
}

export function HumanHeadCanvas() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, 3, -3]} intensity={2} color="#00ff88" />
        <pointLight position={[5, -3, 3]} intensity={2} color="#7c3aed" />
        
        <Suspense fallback={null}>
          <Center>
            <HeadModel />
          </Center>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HumanHeadCanvas;