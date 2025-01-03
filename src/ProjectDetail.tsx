import {useEffect, useState} from 'react';

interface Project {
    title: string;
    client?: string;
    year?: string;
    content: string[];
    tech: string[];
    link: string;
}

export const projectMap: Project[] = [
    {title: '', client: '', year: '', content: [], tech: [], link: ''}, // Empty Spacing
    {
        title: 'Youtube Translate by chop.dev',
        year: '2024',
        content: [
            'A service to help bridge language gaps and make educational content more accessible to everyone.',
        ],
        tech: ['Generative AI', 'Elixir', 'Phoenix Framework', 'Google Cloud Platform'],
        link: 'https://yt.chop.dev/',
    },
    {
        title: 'Liveprompt',
        year: '2023',
        content: [
            'Control a teleprompter remotely in real-time using the web.',
        ],
        tech: ['Elixir', 'Liveview', 'PostgreSQL'],
        link: 'https://liveprompt.chop.dev/',
    },
    {
        title: 'Cardano Globe',
        client: 'LN₳TR - Cardano Stake Pool from Vietnam',
        year: '2019',
        content: [
            'I use a Firebase Cloud Function to periodically pull the information of Stake Pools on Cardano blockchain.',
            'Then I use a ip locator service to locate the country of each pool and store it to Firestore DB. The list of all the pool then cached on GCP Cloud Storage.',
            'The live block production is taken from pool',
        ],
        tech: ['Cardano blockchain', 'Firebase', 'NodeJs', 'Vue + Vite'],
        link: 'https://globe.linatr.me/',
    },
    {
        title: 'Near Line Connect',
        client: 'LINE UIT Workshop',
        year: '2021',
        content: [
            'This is a 3 members presentation for LINE Chat app workshop',
            'We prove a concept of connecting Line members with Near blockchain and allow them to purchase NFT',
        ],
        tech: [
            'Near Protocol Blockchain',
            'LINE Authentication Service',
            'Cryptographic algorithm Ed25519',
            'Near Smart Contract',
            'Rust',
            'Svelte',
        ],
        link: 'https://chop.dev/posts/near-line-connect/',
    },
    {
        title: 'Mini View Trader',
        client: 'TQP trading group',
        year: '2020',
        content: [
            'In this project, I build a trading bot for a group of Vietnamese traders. The bot make and manage orders on Binance Exchange using its API.',
            'The bot using Firebase Cloud Function to run scheduled jobs to check and sync the orders. Then report the result and monitor the trades using a Dashboard build using VueJs',
        ],
        tech: ['Binance API', 'Crypto trading', 'Google Cloud Platform', 'Firebase'],
        link: 'https://mini-view-trader-v2.web.app',
    },
    {
        title: 'Cardano Commands Stake Pools',
        client: 'ARMDA Stake Pool - armadacardano.io',
        year: '2021',
        content: [
            'As a Cardano Pool operator, I have setup stake pools both on testnets and mainnet since early 2021.',
            'During my setups, the part where I need to manage the keys was the most confusing and error prone. So I wrote this tool to help me automate the steps in handling the pool keys.',
        ],
        tech: ['Cardano Blockchain', 'NodeJs', 'Google Cloud Platform'],
        link: 'https://github.com/trchopan/cardano-commands',
    },
    {
        title: 'Scheduled Blocks',
        year: '2022',
        content: [
            'Use the Epoch Nonce seeds and compare with the Pool sigma derived VRF key of the Pool to calculate the block assignment schedule.',
            'Reduce the dependancy on running a complete Cardano node as data is taken from blockfrost.io and armada-alliance.com.',
            'This is a rewritten in Haskell of the ScheduledBlocks in Python.',
        ],
        tech: [
            'Cardano Blockchain',
            'Haskell',
            'Cryptographic tool libsodium',
            'Verifiable random function',
        ],
        link: 'https://github.com/trchopan/scheduled-blocks',
    },
    {
        title: 'Web Scalpel in Haskell',
        year: '2020',
        content: [
            'I start my study in Haskell with this fun project. Which serve me quite well as a hunting tool for good discount of electronic in Vietnam.',
            'The tool live on my Rapsberry Pi and crawl the popular website selling products such as Macbook, Iphone, Samsung Galaxy, etc.',
            'The data is present as a grid view so I can checkout the best prices for each product.',
        ],
        tech: ['Haskell', 'Puppeteer', 'Svelte', 'Raspberry Pi'],
        link: 'https://github.com/trchopan/web-scalpel',
    },
    {
        title: 'Chess using Bevy engine',
        year: '2022',
        content: [
            'Learning Rust was fun. And the most exciting thing is applying what I learn to a real project.',
            'I made this Chess game using Bevy Engine in Rust to try out my skill.',
        ],
        tech: ['Rust', 'Bevy'],
        link: 'https://github.com/trchopan/chess-bevy',
    },
    {
        title: 'Firebase Auth - Rust crate',
        year: '2022',
        content: [
            'I work frequently with Firebase and when I begin to programing in Rust, there was no package for the Firebase tool. So I decided to crate one.',
            'This crate will help initialize and integrate the Firebase Authentication service to the popular Actix web frame work (one of the fastest web frameworks out there)',
        ],
        tech: ['Rust', 'Firebase'],
        link: 'https://crates.io/crates/firebase-auth',
    },
    {title: '', client: '', year: '', content: [], tech: [], link: ''}, // Empty Spacing
    {title: '', client: '', year: '', content: [], tech: [], link: ''}, // Empty Spacing
];

function ProjectDetail(props: {selected: number; onBack: () => void}) {
    const [found, setFound] = useState<Project | null>(projectMap[props.selected] ?? null);
    useEffect(() => {
        setFound(projectMap[props.selected] ?? null);
    }, [props.selected]);

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key == 'Escape') {
            props.onBack();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    return (
        found && (
            <>
                <h1>{found.title}</h1>
                {found.client && (
                    <>
                        <h2>Client</h2>
                        <p>{found.client}</p>
                    </>
                )}
                {found.year && (
                    <>
                        <h2>Year</h2>
                        <p>{found.year}</p>
                    </>
                )}
                <div className="content">
                    {found.content.map((c, i) => (
                        <p key={'c' + i}>{c}</p>
                    ))}
                </div>
                <h3>Technologies</h3>
                <ul>
                    {found.tech.map((c, i) => (
                        <li key={'c' + i}>{c}</li>
                    ))}
                </ul>
                <div className="link">
                    <a href={found.link} target="_blank">
                        <img className="link-icon" src="/hand-point-right.svg" alt="Visit page" />
                        <span>Visit Page</span>
                    </a>
                </div>
            </>
        )
    );
}

export default ProjectDetail;
