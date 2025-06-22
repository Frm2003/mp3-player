'use client';

import { createContext, type FC, type ReactNode, useContext, useState } from 'react';
import type Musica from '../../utils/Musica';

interface iPlayer {
    infoMusica: Musica | null;
    estado: 'played' | 'paused';
    audio: HTMLAudioElement | null;
}

interface iContext {
    state: iPlayer;
    setState: React.Dispatch<React.SetStateAction<iPlayer>>;
}

const initialState: iPlayer = {
    infoMusica: null,
    estado: 'paused',
    audio: null,
};

const PlayerContext = createContext<iContext>({
    state: initialState,
    setState: () => {},
});

export const PlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<iPlayer>(initialState);

    return (
        <PlayerContext.Provider value={{ state, setState }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = (): iContext => useContext(PlayerContext);
