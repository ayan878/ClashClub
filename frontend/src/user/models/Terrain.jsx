import { useGLTF } from "@react-three/drei";
import terrainScene from "../../assets/3d/terrain.glb";

function Terrain(props) {
  const { scene } = useGLTF(terrainScene);
  return <primitive object={scene} {...props} />;
}

export default Terrain;
