import {Line} from '@react-three/drei';
import {Vector3} from 'three';

function LineGroup() {
    const points = [new Vector3(2, 2, -3), new Vector3(2, 0, -3), new Vector3(2, 0, 0)];
    return <Line points={points} color={'#ff6266'} lineWidth={3} dashed={false} />;
}

export default LineGroup;
