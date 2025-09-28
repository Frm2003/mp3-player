import { type ChangeEvent } from 'react';

// COMPONENTES
import Modal from '../../layout/Modal';

// CONTEXTOS
import { useListFileContext } from '../../contexts/ListFileContext';
import { useModalContext } from '../../layout/Modal/context/ModalContext';

// UTILS
import Musica from '../../utils/Musica';

import './styles/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function ModalFiles() {
    // CONTEXTOS GLOBAIS
    const { fileList, forceUpdate } = useListFileContext();
    const { setModal } = useModalContext();

    // METODOS
    const closeModal = (): void => { setModal('ModalFiles', false); }

    const loadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files as FileList;

        for (const file of files) {
            const [artista, name] = file.name
                .replace('.mp3', '')
                .split('-');

            const url = URL.createObjectURL(file);

            const newMusic = new Musica(
                name.trim(),
                '',
                artista.trim(),
                url,
                'mp3'
            );

            fileList.push(newMusic);
            forceUpdate();
        }

        closeModal();
    };

    return (
        <Modal.Root className='modalFiles' dir='top' name='ModalFiles'>
            <div className="body">
                <div className="title">
                    <h3>Selecione os Arquivos</h3>
                    <button onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimes} size='2x' />
                    </button>
                </div>
                <h4>Selecione os arquivos mp3 para reprodução</h4>
                <label htmlFor={'files'}>
                    <p>Selecione os Arquivos</p>
                </label>
                <input
                    id={'files'}
                    onChange={loadFile}
                    type={'file'}
                    multiple
                />
            </div>
        </Modal.Root>
    );
}
