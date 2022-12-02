import {Text} from '@react-three/drei';
import {useEffect, useRef, useState} from 'react';

function LinkText(props: {position: [number, number, number]; text: string; link: string}) {
    const ref = useRef<Text | null>(null);
    const [hovered, setHovered] = useState(false);
    useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered]);

    const onClick = (e: any) => {
        e.stopPropagation();
        window.open(props.link, '_blank');
    };

    return (
        <Text
            onPointerOver={e => (e.stopPropagation(), setHovered(true))}
            onPointerOut={e => setHovered(false)}
            onClick={onClick}
            ref={ref}
            rotation={[Math.PI / 2, Math.PI, 0]}
            position={props.position}
            color={'#fff'}
            fontSize={0.2}
            maxWidth={10}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign={'left'}
            font="/Play-Regular.ttf"
            anchorX="center"
            anchorY="middle"
        >
            {props.text}
        </Text>
    );
}

export default LinkText;
