import { useEffect, useState } from "react";
import { faPause, faPlay, type IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { usePlayerContext } from "../contexts/playerContext";
import { useListFileContext } from "../contexts/ListFileContext";

import type Musica from "../../utils/Musica";

export default function usePlayerHook() {
    // CONTEXTO GLOBAL
    const { fileList } = useListFileContext();
    const { state, setState } = usePlayerContext();
    const { audio, estado, index, infoMusica } = state;

    // VARIAVEIS E ESTADOS REATIVOS
    const [currentTime, setAudioCurrentTime] = useState<number>(0);
    const [currentTimeFormatted, setCurrentTimeFormatted] = useState<string>('0:00');
    const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);

    const icon: IconDefinition = estado === 'played' ? faPause : faPlay;

    // METOOOS
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    // VERIFICA SE A MÚSICA ATUAL ESTÁ SENDO REPRODUZIDA
    const isPlaying = (musica: Musica): boolean => musica.arquivo == infoMusica?.arquivo;

    const updateIndex = (index: number) => {
        setState((prev) => ({
            ...prev,
            index,
        }));
    }

    // MÉTODOS CONTROLE DE ÁUDIO
    const pause = (): void => {
        audio?.pause();

        setState((prev) => ({
            ...prev,
            estado: 'paused',
        }));
    };

    const despause = async (): Promise<void> => {
        await audio?.play();

        setState((prev) => ({
            ...prev,
            estado: 'played',
        }));
    };

    const forward = async (): Promise<void> => { await play(index + 1); };

    const backward = async (): Promise<void> => { await play(index - 1); };

    const play = async (index: number): Promise<void> => {
        if (audio) audio.pause();

        const musica = fileList[index];
        const newAudio = new Audio(musica.arquivo);

        newAudio.addEventListener('pause', () => {
            setState({
                audio: newAudio,
                estado: 'paused',
                infoMusica: musica,
                index
            });
        });

        newAudio.addEventListener('ended', () => { play(index + 1); });

        await newAudio.play();

        setState({
            audio: newAudio,
            estado: 'played',
            infoMusica: musica,
            index
        });
    };

    const toggleAudio: () => void = estado != 'paused' ? pause : despause;

    // MÉTODOS LAYOUT
    const DisplayInfo = (): React.ReactNode =>
        <>
            <h3>{infoMusica?.nome || 'Selecione uma música'}</h3>
            <span>{infoMusica?.artista || '...'}</span>
        </>;

    // HOOKS
    useEffect(() => {
        const timeUpdate = (): void => {
            if (!audio || isUserInteracting) return;
            setAudioCurrentTime(audio.currentTime);
            setCurrentTimeFormatted(formatTime(audio.currentTime));
        };

        audio?.addEventListener('timeupdate', timeUpdate);

        return () => {
            audio?.removeEventListener('timeupdate', timeUpdate);
        };
    }, [audio, isUserInteracting]);

    return {
        audio,
        backward,
        currentTime,
        currentTimeFormatted,
        durationFormatted: formatTime(audio?.duration || 0),
        forward,
        icon,
        isUserInteracting,
        isPlaying,
        DisplayInfo,
        play,
        setIsUserInteracting,
        toggleAudio,
        updateIndex,
    }

}