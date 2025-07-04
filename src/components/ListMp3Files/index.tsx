import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faMusic,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';

// COMPONENTES AUTORAIS
import List from '../../layout/List';

// CONTEXTOS
import { useModalContext } from '../../layout/Modal/context/ModalContext';
import { useListFileContext } from '../../contexts/ListFileContext';
import { usePlayerContext } from '../../contexts/playerContext';

// UTILS
import Musica from '../../utils/Musica';
import style from './styles/style.module.css';


function RenderList(item: Musica) {
    const { state, setState } = usePlayerContext();
    const { audio } = state;

    const play = async (musica: Musica): Promise<void> => {
        if (audio) audio.pause();

        document.title = musica.nome;

        const newAudio = new Audio(musica.arquivo);
        await newAudio.play();
        newAudio.addEventListener('ended', () => {
            if (musica.next) play(musica.next);
        });

        setState({
            audio: newAudio,
            estado: 'played',
            infoMusica: musica,
        });
    };

    return (
        <div className={style.itemList}>
            <div className={style.icon}>
                <FontAwesomeIcon icon={faMusic} size={'1x'} />
            </div>
            <div className={style.info} onClick={() => play(item)}>
                <h3>{item.nome}</h3>
                <span>{item.artista}</span>
            </div>
            <div>
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
        </div>
    );
};

export default function ListMp3Files() {
    // CONTEXTOS GLOBAIS
    const { setShow } = useModalContext();

    const { fileList } = useListFileContext();

    // METODOS
    const openModal = (): void => setShow((prevState: boolean) => !prevState);

    return (
        <section className={style.layout}>
            <article>
                <h2>Lista de reprodução</h2>
                <FontAwesomeIcon
                    icon={faPlus}
                    size={'2x'}
                    onClick={openModal}
                />
            </article>
            <article>
                <List.Root>
                    <List.Body list={fileList.getArray()} functionRender={RenderList} />
                </List.Root>
            </article>
        </section>
    );
}
