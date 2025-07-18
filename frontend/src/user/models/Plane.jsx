import { useAnimations, useGLTF } from "@react-three/drei";
import planeScene from "../../assets/3d/plane.glb";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Plane({ isRotating, setIsRotating, ...props }) {
  const ref = useRef();

  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    const action = actions?.["Take 001"];
    if (!action) return;

    action.setLoop(THREE.LoopRepeat);

    if (isRotating) {
      action.play();
    } else {
      action.stop();
    }
  }, [actions, isRotating]);

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Plane;

// import { useGLTF } from "@react-three/drei";
// import planeScene from "../../assets/3d/plane.glb";

// function Plane(props) {
//   const { scene } = useGLTF(planeScene);
//   return <primitive object={scene} {...props} />;
// }

// export default Plane;

// import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { useEffect, useRef } from "react";
// import planeScene from "../../assets/3d/plane.glb";

// function Plane({ isFlying = false, ...props }) {
//   const { scene } = useGLTF(planeScene);
//   const group = useRef(); // for moving the entire plane
//   const propellerRef = useRef(); // for rotating propeller

//   // Find the propeller in the loaded scene
//   useEffect(() => {
//     const found = scene.getObjectByName("propeller");
//     if (found) {
//       propellerRef.current = found;
//     } else {
//       console.warn("⚠️ No object named 'propeller' found in GLB.");
//     }
//   }, [scene]);

//   // Animate on each frame
//   useFrame((_, delta) => {
//     if (propellerRef.current) {
//       propellerRef.current.rotation.z += delta * (isFlying ? 10 : 0);
//     }

//     if (group.current && isFlying) {
//       group.current.position.y += delta * 0.5;
//       group.current.position.z -= delta * 0.5;
//     }
//   });

//   return <primitive ref={group} object={scene} {...props} />;
// }

// useGLTF.preload(planeScene);

// export default Plane;
