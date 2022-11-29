import {useScroll} from '@react-three/drei';
import {useEffect} from 'react';

export const ScrollHelper = () => {
    const scroll = useScroll();
    useEffect(() => {
        setInterval(() => {
            console.log('scroll:', scroll.offset, scroll);
        }, 1000);
    }, []);
    return <></>;
};
