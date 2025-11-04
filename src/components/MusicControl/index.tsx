import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { useState, type ChangeEvent } from "react";

import Modal from "../../layout/Modal";
import usePlayerHook from "../../hooks/usePlayerHook";
import { useModalContext } from "../../layout/Modal/context/ModalContext";

import './styles/style.css'

export default function MusicControl() {
    // CONTEXTO GLOBAL
    const { setModal } = useModalContext();

    const {
        audio,
        backward,
        currentTime,
        currentTimeFormatted,
        durationFormatted,
        forward,
        icon,
        isUserInteracting,
        DisplayInfo,
        toggleAudio,
        setIsUserInteracting
    } = usePlayerHook();

    // VARIAVEIS
    const [localValue, setLocalValue] = useState(0);
    const displayedValue = isUserInteracting ? localValue : currentTime;

    // MÉTODOS
    const closeModal = (): void => { setModal('MusicControl', false); };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = Number(e.target.value);
        setLocalValue(value);
    };

    const handleTouchStart = (): void => { setIsUserInteracting(true); };

    const handleTouchEnd = (): void => {
        if (!audio) return;
        setIsUserInteracting(false);
        audio.currentTime = localValue;
    };

    return (
        <Modal.Root className='modalBackdrop musicControl' dir='bottom' name='MusicControl'>
            <button onClick={closeModal}>
                <FontAwesomeIcon icon={faAngleDown} size={'3x'} />
            </button>
            <div className={'info'}>
                {DisplayInfo()}
            </div>
            <div className="control">
                <FontAwesomeIcon icon={faBackward} onClick={backward} size={'2x'} />
                <FontAwesomeIcon icon={icon} onClick={toggleAudio} size={'3x'} />
                <FontAwesomeIcon icon={faForward} onClick={forward} size={'2x'} />
            </div>
            <div className="time">
                <input
                    max={audio?.duration || 0}
                    onChange={handleChange}
                    onMouseDown={handleTouchStart}
                    onMouseUp={handleTouchEnd}
                    onTouchEnd={handleTouchEnd}
                    onTouchStart={handleTouchStart}
                    type={"range"}
                    step={0.1}
                    value={displayedValue}
                />
                <div>
                    <span>{currentTimeFormatted}</span>
                    <span>{durationFormatted}</span>
                </div>
            </div>
        </Modal.Root>
    );
}