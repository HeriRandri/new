import { Canvas } from "@react-three/fiber";
import Character3D from "./Character3D";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 2, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <OrbitControls />
      <Character3D />
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.5}
        scale={10}
        blur={2}
        far={5}
      />
      <Environment files="/hdri/brown_photostudio_02_4k.exr" background />
    </Canvas>
  );
}
