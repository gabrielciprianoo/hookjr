import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HookJR from './components/HookJR';

function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-blue-900 to-indigo-950 m-0 p-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 1.8, 4], fov: 50 }}
      >
        
        <OrbitControls enablePan={false} enableRotate={true} enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <HookJR />
      </Canvas>
    </div>
  );
}

export default App;
