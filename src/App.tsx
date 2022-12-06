import 'normalize.css';
import React, {Suspense, useRef} from 'react';
import {
    ContactShadows,
    Environment,
    Html,
    OrbitControls,
    PerspectiveCamera,
    Scroll,
    ScrollControls,
    Stats,
    useProgress,
} from '@react-three/drei';
import {Canvas} from '@react-three/fiber';
import LaptopGroup from './LaptopGroup';
import Overlay from './Overlay';
import {ScrollHelper} from './ScrollHelper';
import {isMobile, store, totalPages} from './store';
import PlaneGroup from './PlaneGroup';
import {useSnapshot} from 'valtio';
import ProjectDetail from './ProjectDetail';

function App() {
    const overlay = useRef<HTMLElement>(null);
    const snap = useSnapshot(store);
    const {active, progress, errors, item, loaded, total} = useProgress();

    return (
        <>

            <Canvas
                camera={{
                    position: [0, isMobile() ? 2 : 0, -30],
                    fov: 35,
                    zoom: isMobile() ? 0.9 : 1.3,
                }}
            >
                <pointLight position={[10, 10, 10]} intensity={1.5} color={'#f0f0f0'} />
                <Suspense
                    fallback={
                        <Html center>
                            <div className="loader">
                                <div className="lds-ripple">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div>Loading</div>
                                <div>{progress.toFixed(0)} %</div>
                            </div>
                        </Html>
                    }
                >
                    <ScrollControls pages={totalPages}>
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
            {snap.selected && (
                <div className="fixed-detail styled-scrollbars">
                    <div className="fixed-container">
                        <ProjectDetail selected={snap.selected} />
                    </div>
                    <button className="back-button" onClick={() => (store.selected = null)}>
                        Back
                    </button>
                </div>
            )}
        </>
    );
}

export default App;
