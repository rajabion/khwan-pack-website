import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { Decal } from '@react-three/drei';
import * as THREE from 'three';

const PAPER_PARAMS = { topRadius: 0.8, bottomRadius: 0.6, height: 2, segments: 64 };

export default function Cup({ type = 'paper', logoUrl }) {
    const paperMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.8 }), []);
    const plasticMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: "#ffffff", transmission: 0.95, roughness: 0.1, thickness: 0.1, ior: 1.5, transparent: true, depthWrite: false, side: THREE.DoubleSide
    }), []);

    const logoTexture = useLoader(THREE.TextureLoader, logoUrl || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');

    const decalScale = useMemo(() => {
        if (!logoTexture.image) return [0, 0, 1];
        const aspect = logoTexture.image.width / logoTexture.image.height;
        return aspect > 1 ? [0.8, 0.8 / aspect, 1] : [0.8 * aspect, 0.8, 1];
    }, [logoTexture]);

    const plasticCupGeometry = useMemo(() => {
        const points = [];
        points.push(new THREE.Vector2(0.01, 0), new THREE.Vector2(0.6, 0));
        for (let i = 0; i <= 10; i++) {
            const t = i / 10;
            points.push(new THREE.Vector2(0.6 + (0.8 - 0.6) * t, 2.0 * t));
        }
        const rimCenter = new THREE.Vector2(0.82, 2.0);
        for (let i = 0; i <= 8; i++) {
            const theta = (i / 8) * Math.PI * 2;
            points.push(new THREE.Vector2(rimCenter.x + Math.cos(theta) * 0.03, rimCenter.y + Math.sin(theta) * 0.03));
        }
        return new THREE.LatheGeometry(points, 64);
    }, []);

    const lidGeometry = useMemo(() => {
        const points = [];
        points.push(new THREE.Vector2(0.83, 2.0), new THREE.Vector2(0.83, 2.05));
        const h = 0.5; const a = 0.83;
        const R = (a * a + h * h) / (2 * h);
        const Cy = 2.05 + h - R;
        const startAngle = Math.asin((2.05 - Cy) / R);
        const endAngle = Math.acos(0.08 / R);
        for (let i = 0; i <= 32; i++) {
            const t = i / 32;
            const theta = startAngle + t * (endAngle - startAngle);
            points.push(new THREE.Vector2(R * Math.cos(theta), Cy + R * Math.sin(theta)));
        }
        points.push(new THREE.Vector2(0.08, 2.52));
        return new THREE.LatheGeometry(points, 64);
    }, []);

    return (
        <group>
            {type === 'paper' ? (
                <mesh position={[0, 1, 0]} material={paperMaterial}>
                    <cylinderGeometry args={[PAPER_PARAMS.topRadius, PAPER_PARAMS.bottomRadius, PAPER_PARAMS.height, PAPER_PARAMS.segments]} />
                    {logoUrl && (
                        <Decal position={[0, 0, 0.75]} rotation={[0, 0, 0]} scale={decalScale}>
                            <meshBasicMaterial map={logoTexture} polygonOffset polygonOffsetFactor={-1} transparent depthTest={true} depthWrite={false} />
                        </Decal>
                    )}
                </mesh>
            ) : (
                <group>
                    <mesh geometry={plasticCupGeometry} material={plasticMaterial} />
                    <mesh position={[0, 1, 0]}>
                        <cylinderGeometry args={[0.79, 0.59, 2, 64]} />
                        <meshBasicMaterial transparent opacity={0} />
                        {logoUrl && (
                            <Decal position={[0, 0, 0.75]} rotation={[0, 0, 0]} scale={decalScale}>
                                <meshBasicMaterial map={logoTexture} polygonOffset polygonOffsetFactor={-4} transparent depthTest={true} depthWrite={false} />
                            </Decal>
                        )}
                    </mesh>
                    <mesh geometry={lidGeometry} material={plasticMaterial} />
                    <mesh position={[0, 2, 0]} rotation={[0, 0, 0.1]}>
                        <cylinderGeometry args={[0.03, 0.03, 3.2, 16]} />
                        <meshStandardMaterial color="#333" roughness={0.4} />
                    </mesh>
                </group>
            )}
        </group>
    );
}
