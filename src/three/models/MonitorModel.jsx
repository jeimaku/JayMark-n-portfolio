import { useGLTF } from "@react-three/drei";

const MODEL_PATH =
  "/old-portfolio-assets/3d/hero/workstation/monitor/computer-screen.glb";

export default function MonitorModel(props) {
  const { scene } = useGLTF(MODEL_PATH);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload(MODEL_PATH);