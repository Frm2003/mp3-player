import { type ReactNode } from 'react';

import carouselStyle from './styles/carousel.module.css';

interface iProps {
    id: `s${number}`;
    page: number;
    children: ReactNode;
}

export default function CauroselLayoutCustomControl({
    id,
    page,
    children,
}: iProps) {
    const onClick = (): void => {
        const initialContent = document.querySelector(`#${id}`) as HTMLElement;
        initialContent.style.marginLeft = `-${20 * page}%`;
    };

    return (
        <button className={carouselStyle.customBtn} onClick={onClick}>
            {children}
        </button>
    );
}
