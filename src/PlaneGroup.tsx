import {Line, Text, useScroll} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {range} from 'lodash';
import {useRef, useState} from 'react';
import * as THREE from 'three';
import {Vector3} from 'three';
import {totalPages} from './store';

function PlaneGroup() {
    const ref = useRef<any>(null);
    const pRef = useRef<any>(null);
    const cRef = useRef<any>(null);
    const scroll = useScroll();
    const [showLines, setShowLines] = useState(false);

    useFrame((state, delta) => {
        if (ref.current) {
            const target = scroll.offset * (totalPages * -32);
            ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, target, 4, delta);
        }
        if (pRef.current && cRef.current) {
            const pRange = scroll.range(0.05, 1 / totalPages - 0.05);
            pRef.current.fillOpacity = pRange;
            const cRange = scroll.range((totalPages - 1) / totalPages - 0.11, 1 / totalPages);
            cRef.current.fillOpacity = cRange;
            console.log('>>', pRange, cRange, 1 / totalPages - 0.05);
        }
        setShowLines(scroll.visible(1 / totalPages + 0.11, 1));
    });

    const points1 = [new Vector3(10, -100, 0), new Vector3(10, -150, 0)];
    const points2 = [new Vector3(-10, -150, 0), new Vector3(-10, -200, 0)];
    const points3 = [new Vector3(10, -200, 0), new Vector3(10, -300, 0)];

    return (
        <mesh ref={ref} position={[0, -6, -400]} rotation={[Math.PI / -2, 0, 0]}>
            <planeGeometry args={[200, totalPages * 100, 100, 100]} />
            <meshBasicMaterial wireframe color="#201b2c" />
            {showLines &&
                [points1, points2, points3].map((points, i) => (
                    <Line key={i} points={points} color="#ff6266" lineWidth={2} />
                ))}
            <Text
                ref={pRef}
                rotation={[Math.PI / 2, Math.PI, 0]}
                position={[0, -25, 5.6]}
                color={'#ff6266'}
                fontSize={0.8}
                maxWidth={10}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign={'left'}
                font="/Play-Regular.ttf"
                anchorX="center"
                anchorY="middle"
                fillOpacity={0}
            >
                Projects
            </Text>
            <Text
                ref={cRef}
                rotation={[Math.PI / 2, Math.PI, 0]}
                position={[0, -300, 7]}
                color={'#ff6266'}
                fontSize={0.3}
                maxWidth={10}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign={'left'}
                font="/Play-Regular.ttf"
                anchorX="center"
                anchorY="middle"
                fillOpacity={0}
            >
                Contact Me
            </Text>
        </mesh>
    );
}

export default PlaneGroup;
