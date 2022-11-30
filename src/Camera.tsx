import {PerspectiveCamera, useHelper} from '@react-three/drei';
import {useRef} from 'react';
import {CameraHelper} from 'three';
import {isMobile} from './store';

function Camera() {
    const ref = useRef<any>(null);
    useHelper(ref, CameraHelper);

    return (
        <PerspectiveCamera
            ref={ref}
            makeDefault
            position={[0, isMobile() ? 2 : 0, -30]}
            // fov={35}
            // zoom={isMobile() ? 0.9 : 1.3}
        />
    );
}

export default Camera;
