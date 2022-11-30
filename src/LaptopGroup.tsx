import * as THREE from 'three';
import {useSpring} from '@react-spring/core';
import {useScroll} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {useRef, useState} from 'react';
import {Group} from 'three';
import {useSnapshot} from 'valtio';
import Laptop from './Laptop';
import {store} from './store';

function LaptopGroup() {
    const ref = useRef<Group | null>(null);
    const snap = useSnapshot(store);
    const scroll = useScroll();
    const hinge = useSpring({open: Number(snap.laptopOpen)});
    const [screen, setScreen] = useState<number | undefined>(0);

    useFrame((state, delta) => {
        if (scroll) {
            store.laptopOpen = scroll.visible(1 / 5 + 0.1, 3 / 5);
            setScreen([0, 1, 2, 3, 4, 5].find(i => scroll.visible(i / 5 + 0.1, 1 / 5)));
        }
        if (ref.current) {
            const targetX = snap.selected !== null ? -5 : 0.01;
            ref.current.position.x = THREE.MathUtils.damp(
                ref.current.position.x,
                targetX,
                4,
                delta
            );
        }
    });

    return (
        <group ref={ref} rotation={[0, Math.PI, 0]} position={[0.01, -1, 2]}>
            <Laptop
                open={snap.laptopOpen}
                hinge={hinge.open.to([0, 1], [1.575, -0.425])}
                screen={screen}
            />
        </group>
    );
}

export default LaptopGroup;
