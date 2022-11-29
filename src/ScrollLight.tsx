import {useDepthBuffer, useScroll} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {useRef} from 'react';
import {PointLight, SpotLight} from 'three';
import * as THREE from 'three';

function ScrollLight() {
    const ref = useRef<SpotLight>(null);
    const scroll = useScroll();

    useFrame((state, delta) => {
        if (!ref.current) return;
        const targetX = scroll.offset * 20 - 10;
        ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, targetX, 4, delta);
        console.log('ref.current', ref.current.position.x);
    });

    // return <pointLight ref={ref} position={[0, 0, 0]} intensity={1.5} color={'#f0f0f0'} />;
    return (
        <spotLight
            ref={ref}
            penumbra={0.5}
            position={[3, 2, 0]}
            intensity={0.5}
            angle={0.5}
            color="#ff005b"
            castShadow
        />
    );
}

export default ScrollLight;
