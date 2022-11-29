import {Text, useScroll} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {useRef} from 'react';
import * as THREE from 'three';

function PlaneGroup() {
    const ref = useRef<any>(null);
    const pRef = useRef<any>(null);
    const scroll = useScroll();
    useFrame((state, delta) => {
        if (!ref.current) return;
        const target = scroll.offset * -180;
        const r1 = scroll.range(0 / 5, 1 / 5);
        ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, target, 4, delta);
        if (!pRef.current) return;
        pRef.current.fillOpacity = r1;
    });

    return (
        <mesh ref={ref} position={[0, -6, -400]} rotation={[Math.PI / -2, 0, 0]}>
            <planeGeometry args={[200, 500, 100, 100]} />
            <meshBasicMaterial wireframe color="#201b2c" side={THREE.DoubleSide} />
            <Text
                ref={pRef}
                rotation={[Math.PI / 2, Math.PI, 0]}
                position={[0, -25, 3]}
                color={'#ff6266'}
                fontSize={0.8}
                maxWidth={10}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign={'left'}
                font="/Play-Regular.ttf"
                anchorX="center"
                anchorY="middle"
                fillOpacity={0.5}
            >
                Projects
            </Text>
        </mesh>
    );
}

export default PlaneGroup;
