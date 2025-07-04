import type { ReactNode } from 'react';

interface iProps<T> {
    list: T[];
    functionRender: (item: T, index?: number) => ReactNode;
}

export default function ListLayoutBody<T>({ list, functionRender }: iProps<T>) {
    return (
        <>
            {list.map((item: T, index: number) => (
                <li key={index}>{functionRender(item, index)}</li>
            ))}
        </>
    );
}
