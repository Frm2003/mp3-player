import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faMusic,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';

// COMPONENTES
import List from '../../layout/List';

// CONTEXTOS
import { useListFileContext } from '../../contexts/ListFileContext';
import { usePlayerContext } from '../../contexts/playerContext';
import { useModalContext } from '../../layout/Modal/context/ModalContext';

// UTILS
import Musica from '../../utils/Musica';

import './styles/style.css';

const PatternItemOfList = (item: Musica, handleClick: (arg: Musica) => void) => {
    return (
        <>
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
        </>
    );
};

export default function ListMp3Files() {
    // CONTEXTOS GLOBAIS
    const { fileList } = useListFileContext();
    const { state, setState } = usePlayerContext();
    const { setModal } = useModalContext();

    // METODOS
    const openModal = (): void => { setModal('ModalFiles', true); };

    const play = async (musica: Musica): Promise<void> => {
        if (state.audio) state.audio.pause();

        document.title = musica.nome;

        const newAudio = new Audio(musica.arquivo);

        newAudio.addEventListener('pause', () => {
            setState({
                audio: newAudio,
                estado: 'paused',
                infoMusica: musica,
            });
        });

        newAudio.addEventListener('ended', () => {
            if (musica.next) play(musica.next);
        });

        await newAudio.play();

        setState({
            audio: newAudio,
            estado: 'played',
            infoMusica: musica,
        });
    };

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
            <List.Root>
                <List.Body
                    click={play}
                    functionRender={PatternItemOfList}
                    list={fileList.getArray()}
                />
            </List.Root>
        </>
    );
}
