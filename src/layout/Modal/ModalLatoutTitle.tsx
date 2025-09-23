'use client';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModalContext } from './context/ModalContext';


import style from './styles/style.module.css';

interface iProps {
    title?: string;
}

export default function ModalLatoutTitle({ title }: iProps) {
    const { setShow } = useModalContext();

    const closeModal = (): void => setShow(false);

    return (
        <div className={style.title}>
            <h3>{title}</h3>
            <button onClick={closeModal}>
                <FontAwesomeIcon icon={faTimes} size={'2x'} />
            </button>
        </div>
    );
}
