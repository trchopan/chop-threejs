import {useScroll} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {useSnapshot} from 'valtio';
import {store} from './store';

const Overlay = forwardRef<any>((_, ref) => {
    const typingRef = useRef(null);
    const [canScroll, setCanScroll] = useState(false);
    const [active, setActive] = useState(false);
    const scroll = useScroll();

    useEffect(() => {
        setTimeout(() => setCanScroll(true), 9000);
        if (!typingRef.current) return;
        // @ts-ignore
        const typewriter = new Typewriter(typingRef.current, {
            loop: false,
            cursor: '',
            delay: 50,
        });
        typewriter
            .typeString('<div>Hi, My name is Quang Tran</div>')
            .typeString('<div><i>aka Chop.</i></div>')
            .pauseFor(200)
            .typeString("<div>I'm a full-stack developer</div>")
            .pauseFor(200)
            .typeString('<div>based in Ho Chi Minh City, Vietnam.</div>')
            .pauseFor(200)
            .typeString('<div>Nice to meet you!</div>')
            .start();
    }, []);

    useFrame(() => {
        setActive(scroll.offset > 0.01);
    });

    return (
        <>
            <div ref={ref} className="container styled-scrollbars">
                <div className={'content_wrapper'}>
                    <div className="greeting">
                        <div className="avatar">
                            <img src="/choptr-avatar.jpg" alt="Chop avatar" />
                        </div>
                        <div className="typing">
                            <div ref={typingRef}></div>
                        </div>
                        <div className={'scroll-down' + (active ? '' : ' active')}>
                            {canScroll && (
                                <>
                                    <div>Scroll Down</div>
                                    <img src="/scroll-down.svg" alt="Scroll down icon" />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default Overlay;
