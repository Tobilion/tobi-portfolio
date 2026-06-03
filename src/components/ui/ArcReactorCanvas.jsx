import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";

function ReactorModel() {
  const { scene } = useGLTF("/models/arc_reactor.glb");
  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.006;
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={1.3} />;
}

export function ArcReactorCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-20">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 3]} intensity={1.2} />
        <pointLight position={[0, 0, 0]} intensity={3} color="#ff3300" />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00ff88" />
        <Suspense fallback={null}>
          <Center>
            <ReactorModel />
          </Center>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ArcReactorCanvas;