import { createContext, type FC, type ReactNode, useContext, useRef, useState } from 'react';
import type Musica from '../../utils/Musica';
import { List } from '../../utils/List';

interface iContext {
    fileList: List<Musica>;
    forceUpdate: () => void;
}

const ListFileContext = createContext<iContext>({
    fileList: new List<Musica>(),
    forceUpdate: () => { },
});

export const ListFileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const fileList = useRef<List<Musica>>(new List()).current;
    const [, setState] = useState<boolean>(false);

    const forceUpdate = (): void => { setState((prevState: boolean) => !prevState) }

    return (
        <ListFileContext.Provider value={{ fileList, forceUpdate }}>
            {children}
        </ListFileContext.Provider>
    );
};

export const useListFileContext = (): iContext => useContext(ListFileContext);
