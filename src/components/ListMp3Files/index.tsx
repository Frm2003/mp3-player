import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faMusic,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';

// COMPONENTES
import List from '../../layout/List';

// CONTEXTOS
import usePlayerHook from '../../hooks/usePlayerHook';
import { useListFileContext } from '../../contexts/ListFileContext';
import { useModalContext } from '../../layout/Modal/context/ModalContext';

// UTILS
import Musica from '../../utils/Musica';

import './styles/style.css';

export default function ListMp3Files() {
    // CONTEXTOS GLOBAIS
    const { fileList } = useListFileContext();
    const { setModal } = useModalContext();

    const { play } = usePlayerHook();

    // VARIAVEIS
    const musics = fileList.getArray();

    // METODOS
    const openModal = (): void => { setModal('ModalFiles', true); };

    return (
        <>
            <div className='title'>
                <h2>Lista de reprodução</h2>
                <FontAwesomeIcon
                    icon={faPlus}
                    size={'2x'}
                    onClick={openModal}
                />
            </div>
            <List.Root className='musicList'>
                {
                    musics.map((item: Musica, index: number) => (
                        <PatternList item={item} handleClick={play} key={index} />
                    ))
                }
            </List.Root>
        </>
    );
}

const PatternList = ({ item, handleClick }: { item: Musica, handleClick: (arg: Musica) => void }) => {
    const { isPlaying } = usePlayerHook();
   
    const isPlayingClass = isPlaying(item.arquivo) ? 'playing' : 'none';

    return (
        <li className={isPlayingClass}>
            <div>
                <FontAwesomeIcon icon={faMusic} size={'1x'} />
            </div>
            <div className='info' onClick={() => handleClick(item)}>
                <h3>{item.nome}</h3>
                <span>{item.artista}</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
        </li>
    );
}