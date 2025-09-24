import {
    faPause,
    faPlay,
    type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePlayerContext } from '../../contexts/playerContext';

import { useEffect, useRef } from 'react';

import './styles/style.css';

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
        <div className='progress'>
            <div ref={progressRef} className={'actualProgress'}></div>
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
        <section className={'playerControl'}>
            <article>
                <div className={'info'}>
                    <h3>{infoMusica?.nome || 'Selecione uma música'}</h3>
                    <span>{infoMusica?.artista || '...'}</span>
                </div>
                <div className={'btn'} onClick={toggleAudio}>
                    <FontAwesomeIcon icon={icone} />
                </div>
            </article>
            <ProgressBar />
        </section>
    );
}
