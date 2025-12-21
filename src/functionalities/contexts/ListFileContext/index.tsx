import { createContext, useContext, useState } from 'react';

import type Musica from '../../../utils/Musica';

interface iContext {
    fileList: Musica[];
    setFileList: React.Dispatch<React.SetStateAction<Musica[]>>;
}

const ListFileContext = createContext<iContext>({
    fileList: [],
    setFileList: () => { },
});

export const ListFileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fileList, setFileList] = useState<Musica[]>([]);

    return (
        <ListFileContext.Provider value={{ fileList, setFileList }}>
            {children}
        </ListFileContext.Provider>
    );
};

export const useListFileContext = (): iContext => useContext(ListFileContext);
