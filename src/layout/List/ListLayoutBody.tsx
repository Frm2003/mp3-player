import type { ReactNode } from 'react';

interface iProps<T> {
    list: T[];
    click?: (item: T) => void | Promise<void>;
    functionRender: (item: T, onClick: () => void, index?: number) => ReactNode;
}

export default function ListLayoutBody<T>({ list, click, functionRender }: iProps<T>) {
    const handleClick = (item?: T) => {
        if (click) click(item as T);
    };

    return (
        <>
            {list.map((item: T, index: number) => (
                <li key={index}>{functionRender(item, handleClick)}</li>
            ))}
        </>
    );
}
