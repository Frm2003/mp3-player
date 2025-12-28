import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faMusic,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';

// COMPONENTES
import List from '../../layout/List';

// CONTEXTOS
import { useModalContext } from '../../layout/Modal/context/ModalContext';

// HOOKS
import usePlayerHook from '../../../functionalities/hooks/usePlayerHook';
import useFilesHook from '../../../functionalities/hooks/useFilesHook';

// UTILS
import type Musica from '../../../utils/Musica';

import './styles/style.css';

export default function ListMp3Files() {
    // CONTEXTOS GLOBAIS
    const { fileList } = useFilesHook();
    const { setModal } = useModalContext();

    // HOOK
    const { play } = usePlayerHook();

    // METODOS
    const openModal = (): void => { setModal('ModalFiles', true); };

    return (
        <>
            <div className='title'>
                <h2>Lista de reprodução</h2>
                <button onClick={openModal}>
                    <FontAwesomeIcon icon={faPlus} size={'2x'} />
                </button>
            </div>
            <List.Root className='musicList'>
                {
                    fileList.map((musica: Musica, index: number) => (
                        <PatternList
                            handleClick={play}
                            index={index}
                            key={index}
                            musica={musica}
                        />
                    ))
                }
            </List.Root>
        </>
    );
}

const PatternList = ({
    handleClick,
    index,
    musica,
}: {
    handleClick: (index: number) => void,
    index: number,
    musica: Musica,
}) => {
    const { isPlaying } = usePlayerHook();

    const isPlayingClass = isPlaying(musica) ? 'playing' : 'none';

    return (
        <li className={isPlayingClass}>
            <div>
                <FontAwesomeIcon icon={faMusic} size={'1x'} />
            </div>
            <div className='info' onClick={() => handleClick(index)}>
                <h3>{musica.nome}</h3>
                <span>{musica.artista}</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
        </li>
    );
}