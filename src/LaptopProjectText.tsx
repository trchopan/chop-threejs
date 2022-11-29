import {Text} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {useEffect, useRef} from 'react';
import {Group} from 'three';
import * as THREE from 'three';

function LaptopProjectText(props: {
    title: string;
    titlePos: [number, number, number];
    text: string;
    textPos: [number, number, number];
    textWidth: number;
}) {
    const textRef = useRef<Group>(null);
    useEffect(() => {
        if (!textRef.current) return;
        textRef.current.position.y = -3;
    }, [props]);

    useFrame((state, delta) => {
        if (!textRef.current) return;
        textRef.current.position.y = THREE.MathUtils.damp(textRef.current.position.y, 0.3, 4, delta);
    });

    return (
        <group ref={textRef} position={[0, -3, -1]}>
            <Text
                position={props.titlePos}
                color={'#ff6266'}
                fontSize={0.5}
                maxWidth={10}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign={'left'}
                font="/Play-Regular.ttf"
                anchorX="center"
                anchorY="middle"
            >
                {props.title}
            </Text>
            <Text
                ref={textRef}
                position={props.textPos}
                color={'#ffffff'}
                fontSize={0.3}
                maxWidth={props.textWidth}
                lineHeight={1.3}
                letterSpacing={0.02}
                textAlign={'left'}
                font="/Play-Regular.ttf"
                anchorX="center"
                anchorY="middle"
            >
                {props.text}
            </Text>
        </group>
    );
}

export default LaptopProjectText;
