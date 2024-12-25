import * as THREE from 'three';
import {useEffect, useRef, useState} from 'react';
import {useFrame, useLoader} from '@react-three/fiber';
import {useGLTF, useVideoTexture} from '@react-three/drei';
import {a as three} from '@react-spring/three';
import {Group, TextureLoader} from 'three';
import LaptopProjectText from './LaptopProjectText';
import {isIOs, store} from './store';

function Laptop(props: {open: boolean; hinge: any; screen?: number}) {
    const group = useRef<Group | null>(null);

    // Load model
    const {nodes, materials} = useGLTF('/mac-draco.glb') as any;

    const [hovered, setHovered] = useState(false);
    useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered]);

    // Make it float in the air when it's opened
    useFrame(state => {
        if (!group.current) return;
        const t = state.clock.getElapsedTime();
        group.current.rotation.x = THREE.MathUtils.lerp(
            group.current.rotation.x,
            props.open ? Math.cos(t / 10) / 10 + 0.25 : 0,
            0.1
        );
        group.current.rotation.y = THREE.MathUtils.lerp(
            group.current.rotation.y,
            props.open ? Math.sin(t / 10) / 4 : 0,
            0.1
        );
        group.current.rotation.z = THREE.MathUtils.lerp(
            group.current.rotation.z,
            props.open ? Math.sin(t / 10) / 10 : 0,
            0.1
        );
        group.current.position.y = THREE.MathUtils.lerp(
            group.current.position.y,
            props.open ? (-2 + Math.sin(t)) / 3 : -4.3,
            0.1
        );
    });

    const screenMap: {
        texture: THREE.VideoTexture | null;
        text: JSX.Element | null;
    }[] = [
        {texture: null, text: null},
        {
            texture: isIOs()
                ? useLoader(TextureLoader, '/yt.png')
                : useVideoTexture('/yt.m4v', {}),
            text: (
                <LaptopProjectText
                    title="Youtube Translate (Yt)"
                    titlePos={[-1.05, 7.8, 0.5]}
                    text="A service to help bridge language gaps and make educational content more accessible to everyone."
                    textPos={[-0.37, 6.7, 0.5]}
                    textWidth={6.6}
                />
            ),
        },
        {
            texture: isIOs()
                ? useLoader(TextureLoader, '/liveprompt.png')
                : useVideoTexture('/liveprompt.m4v', {}),
            text: (
                <LaptopProjectText
                    title="Liveprompt"
                    titlePos={[-2.35, 7.5, 0.5]}
                    text="Control a teleprompter remotely in real-time using the web."
                    textPos={[-0.37, 6.7, 0.5]}
                    textWidth={6.6}
                />
            ),
        },
        {
            texture: isIOs()
                ? useLoader(TextureLoader, '/cardano-globe.jpg')
                : useVideoTexture('/cardano-globe.mp4', {}),
            text: (
                <LaptopProjectText
                    title="Cardano Globe"
                    titlePos={[-2, 7.5, 0.5]}
                    text="Shows live information about Stake pools and block production of Cardano Blockchain."
                    textPos={[-0.37, 6.7, 0.5]}
                    textWidth={6.6}
                />
            ),
        },
        // 2
        {
            texture: isIOs()
                ? useLoader(TextureLoader, '/near-line-connect.jpg')
                : useVideoTexture('/near-line-connect.mp4', {}),
            text: (
                <LaptopProjectText
                    title="Near Line connect"
                    titlePos={[-1.6, 7.5, 0.5]}
                    text="A Proof of Concept for connecting Near Protocol blockchain and Line Chat app."
                    textPos={[-0.22, 6.7, 0.5]}
                    textWidth={6.9}
                />
            ),
        },
        // 3
        {
            texture: isIOs()
                ? useLoader(TextureLoader, '/mini-view-trader.jpg')
                : useVideoTexture('/mini-view-trader.mp4', {}),
            text: (
                <LaptopProjectText
                    title="Mini View Trader"
                    titlePos={[-1.95, 7.7, 0.5]}
                    text="Automate trading bot using Binance API to make daily orders, based on BUY/SELL strategy developed by a Vietnam based team of traders."
                    textPos={[-0.12, 6.7, 0.5]}
                    textWidth={7.5}
                />
            ),
        },
        // 4
        {
            texture: isIOs()
                ? useLoader(TextureLoader, '/cardano-commands.jpg')
                : useVideoTexture('/cardano-commands.mp4', {}),
            text: (
                <LaptopProjectText
                    title="Cardano Commands Stake Pool"
                    titlePos={[-0.26, 7.7, 0.5]}
                    text="Automate the steps in handling the cryptographic keys for Cardano Stake pool between pool owner and pool operator"
                    textPos={[-0.12, 6.7, 0.5]}
                    textWidth={7.5}
                />
            ),
        },
        // 5
        {
            texture: isIOs()
                ? useLoader(TextureLoader, '/scheduled-blocks.jpg')
                : useVideoTexture('/scheduled-blocks.mp4', {}),
            text: (
                <LaptopProjectText
                    title="Scheduled Blocks"
                    titlePos={[-1.85, 7.7, 0.5]}
                    text="Use the Epoch Nonce seeds and compare with the Pool sigma derived VRF key of the Pool to calculate the block assignment schedule."
                    textPos={[-0.12, 6.7, 0.5]}
                    textWidth={7.5}
                />
            ),
        },
        // 6
        {
            texture: isIOs()
                ? useLoader(TextureLoader, '/web-scalpel.jpg')
                : useVideoTexture('/web-scalpel.mp4', {}),
            text: (
                <LaptopProjectText
                    title="Web scalpel in Haskell"
                    titlePos={[-1.3, 7.7, 0.5]}
                    text="Web scraper tool for electronics sold in Vietnam. Categories includes: Macbooks, Samsung Galaxy, Apple Watch, etc."
                    textPos={[-0.12, 6.7, 0.5]}
                    textWidth={7.5}
                />
            ),
        },
        // 7
        {
            texture: isIOs()
                ? useLoader(TextureLoader, '/chess-bevy.jpg')
                : useVideoTexture('/chess-bevy.mp4', {}),
            text: (
                <LaptopProjectText
                    title="Chess using Bevy engine"
                    titlePos={[-1.05, 7.5, 0.5]}
                    text="Chess game writen using Rust language and Bevy game engine."
                    textPos={[-0.12, 6.7, 0.5]}
                    textWidth={7.5}
                />
            ),
        },
        // 8
        {
            texture: isIOs()
                ? useLoader(TextureLoader, '/firebase-auth.jpg')
                : useVideoTexture('/firebase-auth.mp4', {}),
            text: (
                <LaptopProjectText
                    title="Firebase Auth - Rust crate"
                    titlePos={[-0.85, 7.7, 0.5]}
                    text="A simple and small Rust Actix web framework Extractor for verifing JWT token from Firebase Authentication."
                    textPos={[-0.12, 6.7, 0.5]}
                    textWidth={7.5}
                />
            ),
        },
        {texture: null, text: null},
        {texture: null, text: null},
    ];

    for (const t of screenMap) {
        if (!t.texture) continue;
        t.texture.flipY = false;
    }

    const [screenTexture, setScreenTexture] = useState(screenMap[props.screen || 0]);
    useEffect(() => {
        setScreenTexture(screenMap[props.screen || 0]);
    }, [props.screen]);

    const onClick = () => {
        if (!screenMap[props.screen ?? -1]?.text) return;
        store.selected = props.screen ?? null;
    };

    // The view was auto-generated by: https://github.com/pmndrs/gltfjsx
    // Events and spring animations were added afterwards
    return (
        <group
            ref={group}
            {...props}
            dispose={null}
            onPointerOver={e => (e.stopPropagation(), setHovered(true))}
            onPointerOut={e => setHovered(false)}
            onClick={onClick}
        >
            <three.group rotation-x={props.hinge} position={[0, -0.04, 0.41]}>
                {screenTexture.text}
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
                    <mesh
                        material={materials['matte.001']}
                        geometry={nodes['Cube008_1'].geometry}
                    />
                    <mesh geometry={nodes['Cube008_2'].geometry}>
                        {screenTexture.texture && (
                            <meshStandardMaterial map={screenTexture.texture} />
                        )}
                    </mesh>
                </group>
            </three.group>
            <mesh
                material={materials.keys}
                geometry={nodes.keyboard.geometry}
                position={[1.79, 0, 3.45]}
            />
            <group position={[0, -0.1, 3.39]}>
                <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
                <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
            </group>
            <mesh
                material={materials.touchbar}
                geometry={nodes.touchbar.geometry}
                position={[0, -0.03, 1.2]}
            />
        </group>
    );
}

export default Laptop;
