import * as THREE from 'three';
import React, {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {useGLTF, MeshDistortMaterial, Shadow, Text} from '@react-three/drei';
import {Group} from 'three';

export default function Model() {
    const group = useRef<Group | null>(null);
    const shadow = useRef<any>(null);
    const {nodes} = useGLTF('/geo.min.glb', true) as any;
    useFrame(({clock, mouse}) => {
        if (!group.current) return;
        const t = (1 + Math.sin(clock.getElapsedTime() * 1.5)) / 2;
        group.current.position.y = t / 3;
        group.current.rotation.x = group.current.rotation.z += 0.005;
        group.current.position.x = THREE.MathUtils.lerp(
            group.current.position.x,
            mouse.x / 2,
            0.05
        );
        group.current.position.z = THREE.MathUtils.lerp(
            group.current.position.z,
            mouse.y / 4,
            0.03
        );
    });
    return (
        <group ref={group}>
            <mesh geometry={nodes.geo.geometry} castShadow receiveShadow>
                <MeshDistortMaterial
                    color="#ffffff"
                    flatShading
                    roughness={1}
                    metalness={0.5}
                    factor={15}
                    speed={5}
                />
            </mesh>
            <mesh geometry={nodes.geo.geometry}>
                <meshBasicMaterial wireframe />
            </mesh>
        </group>
    );
}
