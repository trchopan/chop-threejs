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

    useFrame(() => {
        if (!ref.current || !scroll) return;
        store.laptopOpen = scroll.visible(1 / 5 + 0.1, 3 / 5);
        setScreen([0, 1, 2, 3, 4, 5].find(i => scroll.visible(i / 5 + 0.1, 1 / 5)));
    });

    return (
        <group ref={ref} rotation={[0, Math.PI, 0]} position={[0, -1, 2]}>
            <Laptop
                open={snap.laptopOpen}
                hinge={hinge.open.to([0, 1], [1.575, -0.425])}
                screen={screen}
            />
        </group>
    );
}

export default LaptopGroup;
