import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faMusic,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

// COMPONENTES
import List from '../../layout/List';

// CONTEXTOS
import { useModalContext } from '../../layout/Modal/context/ModalContext';
import { useListFileContext } from '../../../functionalities/contexts/ListFileContext';

// HOOKS
import usePlayerHook from '../../../functionalities/hooks/usePlayerHook';

// UTILS
import type Musica from '../../../utils/Musica';

import './styles/style.css';

export default function ListMp3Files() {
    // CONTEXTOS GLOBAIS
    const { fileList, setFileList } = useListFileContext();
    const { setModal } = useModalContext();

    // VARIAVEIS
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    // HOOK
    const { play } = usePlayerHook();

    // METODOS
    const openModal = (): void => { setModal('ModalFiles', true); };

    const handleDrop = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;

        const items = [...fileList];
        const draggedItem = items[dragItem.current];

        items.splice(dragItem.current, 1);
        items.splice(dragOverItem.current, 0, draggedItem);

        dragItem.current = null;
        dragOverItem.current = null;

        setFileList(items);
    };

    return (
        <>
            <div className='title'>
                <h2>Lista de reprodução</h2>
                <button onClick={openModal}>
                    <FontAwesomeIcon
                        icon={faPlus}
                        size={'2x'}
                    />
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
                            onDragStart={() => (dragItem.current = index)}
                            onDragEnter={() => (dragOverItem.current = index)}
                            onDragEnd={handleDrop}
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
    onDragStart,
    onDragEnter,
    onDragEnd
}: {
    handleClick: (index: number) => void,
    index: number,
    musica: Musica,
    onDragStart: () => void;
    onDragEnter: () => void;
    onDragEnd: () => void;
}) => {
    const { isPlaying } = usePlayerHook();

    const isPlayingClass = isPlaying(musica) ? 'playing' : 'none';

    return (
        <li
            className={isPlayingClass}
            draggable
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
        >
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