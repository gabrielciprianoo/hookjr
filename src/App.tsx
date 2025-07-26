import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <div className="w-screen h-screen bg-blue-600">
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        {/* Aquí irá Hook JR */}
      </Canvas>
    </div>
  );
}

export default App;
