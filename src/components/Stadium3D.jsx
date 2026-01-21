import { Canvas } from "@react-three/fiber";

/* ---------------- LIGHT POLE ---------------- */
function LightPole({ x, z }) {
  return (
    <>
      {/* Pole */}
      <mesh position={[x, 2, z]}>
        <cylinderGeometry args={[0.08, 0.08, 4, 12]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Lamp */}
      <mesh position={[x, 4.3, z]}>
        <boxGeometry args={[0.6, 0.3, 0.3]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#7df9ff"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Light */}
      <pointLight
        position={[x, 4.3, z]}
        intensity={1.6}
        color="#7df9ff"
        distance={18}
      />
    </>
  );
}

/* ---------------- CROWD ---------------- */
function CrowdRing({ radius, height, count }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(a) * radius,
              height,
              Math.sin(a) * radius
            ]}
          >
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#00e5ff"
              emissive="#00e5ff"
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
    </>
  );
}

/* ---------------- PLAYER ---------------- */
function Player({ x, rotation }) {
  return (
    <>
      {/* Body */}
      <mesh position={[x, -0.5, 0]} rotation={[0, rotation, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 1.2, 12]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Head */}
      <mesh position={[x, 0.25, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </>
  );
}

/* ---------------- STADIUM ---------------- */
function Stadium({ showPlayers }) {
  return (
    <>
      {/* LOWER STAND */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <cylinderGeometry args={[8, 8, 1.6, 64, 1, true]} />
        <meshStandardMaterial color="#2a2a2a" side={2} />
      </mesh>

      {/* UPPER STAND */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.7, 0]}>
        <cylinderGeometry args={[11, 11, 2, 64, 1, true]} />
        <meshStandardMaterial color="#1f1f1f" side={2} />
      </mesh>

      {/* CROWD */}
      <CrowdRing radius={8.2} height={-0.4} count={90} />
      <CrowdRing radius={11.2} height={1.5} count={140} />

      {/* GROUND */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]}>
        <circleGeometry args={[6.5, 64]} />
        <meshStandardMaterial color="#0b3d1e" />
      </mesh>

      {/* PITCH */}
      <mesh position={[0, -1.28, 0]}>
        <boxGeometry args={[1.4, 0.06, 3.2]} />
        <meshStandardMaterial
          color="#c2a46d"
          emissive="#6b4f1d"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* STUMPS */}
      {[-0.18, 0, 0.18].map((x, i) => (
        <mesh key={i} position={[x, -0.8, 1.5]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 12]} />
          <meshStandardMaterial
            color="white"
            emissive="white"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {/* PLAYERS (APPEAR ON PREDICT CLICK) */}
      {showPlayers && (
        <>
          <Player x={-0.6} rotation={Math.PI / 2} />
          <Player x={0.6} rotation={-Math.PI / 2} />
        </>
      )}
    </>
  );
}

/* ---------------- MAIN EXPORT ---------------- */
export default function Stadium3D({ showPlayers }) {
  return (
    <Canvas
      camera={{ position: [0, 4.5, 9], fov: 45 }}
      style={{ height: "380px", width: "100%" }}
    >
      {/* BASE LIGHT */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 10, 5]} intensity={2} />
      <directionalLight position={[5, 8, -5]} intensity={1.5} />

      {/* LIGHT POLES */}
      <LightPole x={8} z={0} />
      <LightPole x={-8} z={0} />
      <LightPole x={0} z={8} />
      <LightPole x={0} z={-8} />

      {/* ATMOSPHERE */}
      <fog attach="fog" args={["#000000", 6, 18]} />

      <Stadium showPlayers={showPlayers} />
    </Canvas>
  );
}
