import {
    faPause,
    faPlay,
    type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePlayerContext } from '../../contexts/playerContext';

import style from './styles/style.module.css';
import { useEffect, useRef } from 'react';

function ProgressBar() {
    const { state } = usePlayerContext();
    const { audio } = state;

    const progressRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!audio || !progressRef.current) return;

        const updateTimeAudio = (): void => {
            if (!progressRef.current) return;

            const progress: number = (audio.currentTime / audio.duration) * 100;
            progressRef.current.style.width = `${progress}%`
        };

        audio.addEventListener('timeupdate', updateTimeAudio);

        return () => {
            audio.removeEventListener('timeupdate', updateTimeAudio)
        };
    }, [audio]);

    return (
        <div className={style.progress}>
            <div ref={progressRef} className={style.actualProgress}></div>
        </div>
    );
}

export default function PlayerControl() {
    const { state, setState } = usePlayerContext();

    const { infoMusica, estado, audio } = state;

    const icone: IconDefinition = estado != 'paused' ? faPause : faPlay;

    const pause = (): void => {
        audio?.pause();

        setState((prev) => ({
            ...prev,
            estado: 'paused',
        }));
    };

    const play = (): void => {
        audio?.play();

        setState((prev) => ({
            ...prev,
            estado: 'played',
        }));
    };

    const toggleAudio: () => void = estado != 'paused' ? pause : play;

    return (
        <section className={style.layout}>
            <article>
                <div className={style.main}>
                    <div className={style.title}>
                        <h3>{infoMusica?.nome || 'Selecione uma musica'}</h3>
                        <span>{infoMusica?.artista || '...'}</span>
                    </div>
                    <div className={style.icon} onClick={toggleAudio}>
                        <FontAwesomeIcon icon={icone} size={'1x'} />
                    </div>
                </div>
                <ProgressBar />
            </article>
        </section>
    );
}

/* 
    <div className={style.btn} onClick={toggleAudio}>
                    <FontAwesomeIcon icon={icone} size={'2x'} />
                </div>
                <ProgressBar />
*/