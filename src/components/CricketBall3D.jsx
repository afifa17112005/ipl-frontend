import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus } from "@react-three/drei";

export default function CricketBall3D() {
    const meshRef = useRef();

    // Rotate the ball
    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta * 0.5;
        meshRef.current.rotation.x += delta * 0.2;
    });

    return (
        <group ref={meshRef}>
            {/* The Ball - Red */}
            <Sphere args={[2.5, 32, 32]}>
                <meshStandardMaterial
                    color="#D32F2F"
                    roughness={0.4}
                    metalness={0.1}
                />
            </Sphere>

            {/* The Seam - White/Yellowish Stitching */}
            {/* We use a Torus to simulate the seam around the ball */}
            <Torus args={[2.52, 0.08, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#FFFDE7" roughness={0.8} />
            </Torus>

            {/* Secondary Stitch Details (Optional, simplified for now) */}
            <Torus args={[2.52, 0.05, 16, 100]} rotation={[Math.PI / 2, 0.2, 0]}>
                <meshStandardMaterial color="#FFFDE7" roughness={0.8} />
            </Torus>
            <Torus args={[2.52, 0.05, 16, 100]} rotation={[Math.PI / 2, -0.2, 0]}>
                <meshStandardMaterial color="#FFFDE7" roughness={0.8} />
            </Torus>
        </group>
    );
}
