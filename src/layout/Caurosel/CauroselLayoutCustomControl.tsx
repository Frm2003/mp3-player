'use client';

import { type ReactNode } from 'react';

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
        <label htmlFor={`r${page}`} onClick={onClick}>
            {children}
        </label>
    );
}
