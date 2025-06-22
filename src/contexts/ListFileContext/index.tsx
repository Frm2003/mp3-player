'use client';


import { createContext, type FC, type ReactNode, useContext, useState } from 'react';
import type Musica from '../../utils/Musica';

interface iContext {
    list: Musica[];
    setList: React.Dispatch<React.SetStateAction<Musica[]>>;
}

const ListFileContext = createContext<iContext>({
    list: [],
    setList: () => { },
});

export const ListFileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [list, setList] = useState<Musica[]>([]);

    return (
        <ListFileContext.Provider value={{ list, setList }}>
            {children}
        </ListFileContext.Provider>
    );
};

export const useListFileContext = (): iContext => useContext(ListFileContext);
