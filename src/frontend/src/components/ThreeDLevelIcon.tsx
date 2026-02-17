import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cone, Torus } from '@react-three/drei';
import { Suspense } from 'react';

interface ThreeDLevelIconProps {
  icon: string;
  color: string;
  locked?: boolean;
  completed?: boolean;
  size?: number;
}

function IconMesh({ icon, color }: { icon: string; color: string }) {
  const getGeometry = () => {
    switch (icon) {
      case 'atom':
      case 'molecule':
      case 'cell':
        return <Sphere args={[0.8, 32, 32]}><meshStandardMaterial color={color} metalness={0.8} roughness={0.2} /></Sphere>;
      case 'cube':
      case 'quadrilateral':
        return <Box args={[1, 1, 1]}><meshStandardMaterial color={color} metalness={0.8} roughness={0.2} /></Box>;
      case 'triangle':
      case 'pyramid':
        return <Cone args={[0.8, 1.5, 3]}><meshStandardMaterial color={color} metalness={0.8} roughness={0.2} /></Cone>;
      case 'circle':
      case 'torus':
        return <Torus args={[0.6, 0.2, 16, 32]}><meshStandardMaterial color={color} metalness={0.8} roughness={0.2} /></Torus>;
      default:
        return <Box args={[1, 1, 1]}><meshStandardMaterial color={color} metalness={0.8} roughness={0.2} /></Box>;
    }
  };

  return (
    <group rotation={[0.3, 0.3, 0]}>
      {getGeometry()}
    </group>
  );
}

export default function ThreeDLevelIcon({ icon, color, locked = false, completed = false, size = 80 }: ThreeDLevelIconProps) {
  const displayColor = locked ? '#666666' : completed ? '#22c55e' : color;

  return (
    <div style={{ width: size, height: size }} className="relative">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <IconMesh icon={icon} color={displayColor} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
        </Suspense>
      </Canvas>
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
          <span className="text-2xl">🔒</span>
        </div>
      )}
      {completed && (
        <div className="absolute top-0 right-0 bg-green-500 rounded-full p-1">
          <span className="text-xs">✓</span>
        </div>
      )}
    </div>
  );
}
