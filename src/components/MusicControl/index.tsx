import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBackward, faForward, faPause, faPlay, type IconDefinition } from "@fortawesome/free-solid-svg-icons";

import Modal from "../../layout/Modal";

import './styles/style.css'
import { useModalContext } from "../../layout/Modal/context/ModalContext";
import { usePlayerContext } from "../../contexts/playerContext";

export default function MusicControl() {
    const { state } = usePlayerContext();
    const { setModal } = useModalContext();

    const closeModal = (): void => { setModal('MusicControl', false); };

    const icon: IconDefinition = state.estado === 'played' ? faPause : faPlay;

    return (
        <Modal.Root className='musicControl' dir='bottom' name='MusicControl'>
            <button onClick={closeModal} >
                <FontAwesomeIcon icon={faAngleDown} size={'2x'} />
            </button>
            <div className="control">
                <FontAwesomeIcon icon={faBackward} size={'1x'} />
                <FontAwesomeIcon icon={icon} size={'2x'} />
                <FontAwesomeIcon icon={faForward} size={'1x'} />
            </div>
        </Modal.Root>
    );
}
