import {proxy} from 'valtio';

export const projectPages = 8;

export const totalPages =
    1 + // Intro page
    projectPages +
    1; // Footer page

export const isMobile = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform);

export const isIOs = () =>
    /iPhone|iPad|iPod/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.platform);

export const store = proxy<{
    laptopOpen: boolean;
    selected: number | null;
}>({laptopOpen: false, selected: null});
