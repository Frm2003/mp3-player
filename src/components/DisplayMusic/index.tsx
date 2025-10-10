import {
    faPause,
    faPlay,
    type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';

// CONTEXTOS GLOBAIS
import { usePlayerContext } from '../../contexts/playerContext';
import { useModalContext } from '../../layout/Modal/context/ModalContext';


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

export default function DisplayMusic() {
    // CONTEXTOS GLOBAIS
    const { state, setState } = usePlayerContext();
    const { setModal } = useModalContext();

    const { infoMusica, estado, audio } = state;

    // VARIAVEIS
    const icone: IconDefinition = estado != 'paused' ? faPause : faPlay;

    // METODOS
    const openModal = (): void => { setModal('MusicControl', true); };

    const pause = (): void => {
        audio?.pause();

        setState((prev) => ({
            ...prev,
            estado: 'paused',
        }));
    };

    const play = async (): Promise<void> => {
        await audio?.play();

        setState((prev) => ({
            ...prev,
            estado: 'played',
        }));
    };

    const toggleAudio: () => void = estado != 'paused' ? pause : play;

    return (
        <section className={'playerControl'}>
            <article>
                <div className={'info'} onClick={openModal}>
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
