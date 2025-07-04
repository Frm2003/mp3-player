import { createContext, type FC, type ReactNode, useContext, useState } from 'react';
import type Musica from '../../utils/Musica';
import { List } from '../../utils/List';

interface iContext {
    fileList: List<Musica>;
}

const ListFileContext = createContext<iContext>({
    fileList: new List<Musica>(),
});

export const ListFileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [fileList] = useState<List<Musica>>(new List());

    return (
        <ListFileContext.Provider value={{ fileList }}>
            {children}
        </ListFileContext.Provider>
    );
};

export const useListFileContext = (): iContext => useContext(ListFileContext);
