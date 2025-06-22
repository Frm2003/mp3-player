import type { ReactNode } from 'react';

import carouselStyle from './styles/carousel.module.css';

interface iProps {
    id: `s${number}`;
    children: ReactNode[];
}

export default function CarouselLayoutBody({ id, children }: iProps) {
    return (
        <div className={carouselStyle.slideBody}>
            <div className={carouselStyle.slides}>
                {children.map((content: ReactNode, index: number) => (
                    <div
                        className={carouselStyle.content}
                        id={index === 0 ? id : 's'}
                        key={index}
                    >
                        {content}
                    </div>
                ))}
            </div>
        </div>
    );
}
