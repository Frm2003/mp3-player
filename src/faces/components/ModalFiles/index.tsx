import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// COMPONENTES
import Modal from '../../layout/Modal';

import './styles/style.css';
import useFilesHook from '../../../functionalities/hooks/useFilesHook';

export default function ModalFiles() {
    // CONTEXTOS GLOBAIS
    const { closeModalFiles, loadFiles } = useFilesHook();

    return (
        <Modal.Root className='modalBackdrop modalFiles' dir='top' name='ModalFiles'>
            <div className="body">
                <div className="title">
                    <h3>Selecione os Arquivos</h3>
                    <button onClick={closeModalFiles}>
                        <FontAwesomeIcon icon={faTimes} size='2x' />
                    </button>
                </div>
                <h4>Selecione os arquivos mp3 para reprodução</h4>
                <label htmlFor={'files'}>
                    <p>Selecione os Arquivos</p>
                </label>
                <input
                    id={'files'}
                    onChange={loadFiles}
                    type={'file'}
                    multiple
                />
            </div>
        </Modal.Root>
    );
}
