import { useLayoutEffect, useRef, type ReactNode } from 'react';

interface iProps {
    children: ReactNode;
    className?: string;
}

export default function ListLayoutRoot({ children, className }: iProps) {
    const ulRef = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        const calcHeight = (): void => {
            if (!ulRef.current) return;

            const height = window.innerHeight
            ulRef.current.style.height = `${height - 180}px`;
        };

        calcHeight();
        window.addEventListener('resize', calcHeight);

        return () => {
            window.removeEventListener('resize', calcHeight);
        };
    }, []);

    return <ul className={className} ref={ulRef}>{children}</ul>;
}
