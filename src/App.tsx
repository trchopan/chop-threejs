import React, {Suspense, useRef} from 'react';
import {ContactShadows, Environment, Scroll, ScrollControls, Stats} from '@react-three/drei';
import {Html} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import LaptopGroup from './LaptopGroup';
import Overlay from './Overlay';
import {ScrollHelper} from './ScrollHelper';
import {isMobile} from './store';
import LineGroup from './LineGroup';
import PlaneGroup from './PlaneGroup';

function App() {
    const overlay = useRef<HTMLElement>(null);

    return (
        <>
            <Canvas
                camera={{
                    position: [0, isMobile() ? 2 : 0, -30],
                    fov: 35,
                    zoom: isMobile() ? 0.9 : 1.3,
                }}
            >
                <Suspense fallback={<Html center className="loading" children="Loading..." />}>
                    <pointLight position={[10, 10, 10]} intensity={1.5} color={'#f0f0f0'} />
                    <ScrollControls pages={5}>
                        <ScrollHelper />
                        <Scroll html>
                            <Overlay ref={overlay} />
                        </Scroll>
                        <LaptopGroup />
                        <PlaneGroup />
                    </ScrollControls>
                    <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
                    <Environment preset="city" />
                </Suspense>
                {import.meta.env.DEV && <Stats />}
            </Canvas>
            <div className="mask-layer"></div>
            <div className="fixed-detail">
                <h1>Cardano Globe</h1>
                <p>Consectetur nisi asperiores blanditiis repudiandae esse Reiciendis officia molestias ipsam recusandae quisquam tempora. Sit sint dignissimos voluptatum fugit error. Assumenda.</p>
                <p>Consectetur nisi asperiores blanditiis repudiandae esse Reiciendis officia molestias ipsam recusandae quisquam tempora. Sit sint dignissimos voluptatum fugit error. Assumenda.</p>
                <a href="https://globe.linatr.me/" target={"_blank"}>Visit website</a>
            </div>
        </>
    );
}

export default App;
