import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// CONTEXTOS GLOBAIS
import usePlayerHook from '../../../functionalities/hooks/usePlayerHook';
import { useModalContext } from '../../layout/Modal/context/ModalContext';

import './styles/style.css';

export default function DisplayMusic() {
    // CONTEXTOS GLOBAIS
    const { setModal } = useModalContext();
    const { audio, currentTime, icon, DisplayInfo, toggleAudio } = usePlayerHook();

    // VARIAVEIS
    const currentProgress: number = (currentTime / (audio?.duration || 0)) * 100;

    // METODOS
    const openModal = (): void => { setModal('MusicControl', true); };

    return (
        <section className={'playerControl'}>
            <article>
                <div className={'info'} onClick={openModal}>
                    {DisplayInfo()}
                </div>
                <div className={'btn'} onClick={toggleAudio}>
                    <FontAwesomeIcon icon={icon} />
                </div>
            </article>
            <div className='progress'>
                <div style={{ width: `${currentProgress}%` }} className={'actualProgress'}></div>
            </div>
        </section>
    );
}
