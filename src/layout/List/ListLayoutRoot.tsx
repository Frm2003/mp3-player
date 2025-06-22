import { type ReactNode } from 'react';

import style from './styles/style.module.css';

interface iProps {
    children: ReactNode;
}

export default function ListLayoutRoot({ children }: iProps) {
    return <ul className={style.layout}>{children}</ul>;
}
