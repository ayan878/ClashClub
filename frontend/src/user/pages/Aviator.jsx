// import { Plane } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
// import { Loader } from "lucide-react";
// import React, { Suspense } from "react";

// function Aviator() {
//   return (
//     <section className="w-full h-screen relative">
//       <Canvas
//         className="w-full h-screen bg-transparent"
//         camera={{ near: 0.1, far: 1000 }}
//       >
//         <Suspense fallback={<Loader />}>
//           <directionalLight position={[1,1,1]} intensity={2} />
//           <ambientLight intensity={0.5} />
//           {/* <pointLight />
//           <spotLight />
//           <hemisphereLight /> */}
//           <Plane/>
//         </Suspense>
//       </Canvas>
//     </section>
//   );
// }

// export default Aviator;

// //to finding quality 3d model sketchfab.com
// // download glb once model downloaded and to load model in three.js need to generste code in gltf.pmnd.rs

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import Plane from "../models/Plane";
import Terrain from "../models/Terrain";
import { Button } from "@/components/ui/button";

export default function Aviator() {
  const [isRotating, setIsRotating] = useState(false);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -0.6, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 0.5, 1];
    }
    return [screenScale, screenPosition, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  };

  const [isIslandScale, isIlandPosition] = adjustPlaneForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

//   const handlePlane = (e)=>{
//     e.stopProagation();
//     e.preventDefault();
//     setIsRotating(true)

//     const clientX = e.touches ? e.touches[0]:clientX;
//     // lastX.current = clientX;
//   }

  return (
    <section className="w-full h-screen bg-black">
      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating}`}
        camera={{ position: [0, 2, 5], fov: 60 }}
        shadows
      >
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />

        {/* Controls */}
        <OrbitControls />

        {/* Environment light */}
        <Environment preset="sunset" />

        {/* 3D Model */}
        <Suspense
          fallback={
            <Html>
              <div className="text-white">Loading plane...</div>
            </Html>
          }
        >
          <Plane
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            planePosition={planePosition}
            planeScale={planeScale}
            rotation={[0, 20, 0]}
          />
          {/* <Terrain /> */}
        </Suspense>
      </Canvas>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <Button onClick={() => setIsRotating((prev) => !prev)}> Bet 🚀</Button>
      </div>
    </section>
  );
}


// import React, { Suspense, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment, Html } from "@react-three/drei";
// import Plane from "../models/Plane";

// export default function Aviator() {
//   const [isFlying, setIsFlying] = useState(false);

//   const handleBet = () => {
//     setIsFlying((prev)=>!prev);
//   };

//   return (
//     <section className="relative w-full h-screen bg-black">
//       <Canvas camera={{ position: [0, 2, 5], fov: 60 }} shadows>
//         <ambientLight intensity={0.4} />
//         <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
//         <OrbitControls />
//         <Environment preset="sunset" />

//         <Suspense
//           fallback={
//             <Html>
//               <div className="text-white">Loading plane...</div>
//             </Html>
//           }
//         >
//           <Plane isFlying={isFlying} position={[0, 0, 0]} scale={1.5} />
//         </Suspense>
//       </Canvas>

//       <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
//         <button
//           onClick={handleBet}
//           className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Bet 🚀
//         </button>
//       </div>
//     </section>
//   );
// }
