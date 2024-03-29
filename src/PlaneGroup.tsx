import {Line, Text, useScroll} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {useRef, useState} from 'react';
import * as THREE from 'three';
import {Vector3} from 'three';
import {isMobile, totalPages} from './store';
import Geo from './Geo';
import LinkText from './LinkText';

function PlaneGroup() {
    const ref = useRef<any>(null);
    const pRef = useRef<any>(null);
    const scroll = useScroll();
    const [showLines, setShowLines] = useState(false);

    useFrame((state, delta) => {
        if (ref.current) {
            const target = scroll.offset * (totalPages * -32);
            ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, target, 4, delta);
        }
        if (pRef.current) {
            const pRange = scroll.range(0.05, 1 / totalPages - 0.05);
            pRef.current.fillOpacity = pRange;
        }
        setShowLines(scroll.visible(1 / totalPages + 0.11, 1));
    });

    const points1 = [new Vector3(10, -100, 0), new Vector3(10, -150, 0)];
    const points2 = [new Vector3(-10, -150, 0), new Vector3(-10, -200, 0)];
    const points3 = [new Vector3(10, -200, 0), new Vector3(10, -300, 0)];

    return (
        <mesh ref={ref} position={[0, -6, -400]} rotation={[Math.PI / -2, 0, 0]}>
            <planeGeometry args={[200, totalPages * 100, 100, 100]} />
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
            <meshBasicMaterial wireframe color="#201b2c" />
            {showLines &&
                [points1, points2, points3].map((points, i) => (
                    <Line key={i} points={points} color="#ff6266" lineWidth={2} />
                ))}
            {showLines && (
                <group position={[0, -340, isMobile() ? 6.8 : 6]}>
                    <Geo />
                    <LinkText position={[2, 0, 0]} text="Telegram" link="https://t.me/choptran" />
                    <LinkText
                        position={[0, 0, 2]}
                        text="Youtube"
                        link="https://youtube.com/@choptran"
                    />
                    <LinkText position={[-2, 0, 0]} text="Blog" link="http://chop.dev/" />
                    <LinkText
                        position={[0, 0, -2]}
                        text="Github"
                        link="https://github.com/trchopan/"
                    />
                </group>
            )}
        </mesh>
    );
}

export default PlaneGroup;
