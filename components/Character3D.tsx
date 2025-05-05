import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

useGLTF.preload("/glb/robot.glb");

export default function Model() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/glb/robot.glb");
  const { actions, names } = useAnimations(animations, scene);
  // const scroll = useScroll();
  const [clipDuration, setClipDuration] = useState(1);

  useEffect(() => {
    console.log("Noms des animations :", names);
  }, [names]);

  useEffect(() => {
    const action = actions["Experiment"];
    if (action) {
      action.play().paused = true;
      setClipDuration(action.getClip().duration);
    }
  }, [actions]);

  let clock = 0;

  useFrame((state, delta) => {
    const action = actions["Experiment"];
    if (action) {
      action.paused = false;
      clock += delta;
      action.time = clock % clipDuration;
    }
  });
  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}
