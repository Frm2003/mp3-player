import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

import { ModalInternalProvider, useModalContext } from './context/ModalContext';

type Dir = 'top' | 'bottom'

interface iProps {
    children: ReactNode,
    className?: string,
    dir?: Dir;
    name: string,
}

export default function ModalLayoutRoot({ children, className, dir, name }: iProps) {
    // CONTEXTO GLOBAL
    const { modals, setModal } = useModalContext();

    // VARIAVEIS DE CONTROLE
    const modalRef = useRef<HTMLElement>(null);
    const isOpen: boolean = modals[name] === true; /* verifica se está aberta */

    // OCULTA A MODAL NO PRIMEIRO RENDER
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            if (!isOpen || !modalRef.current) return;

            if (e.key == "Escape") 
                setModal(name, false);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [name, isOpen, setModal]);

    // DEFINE O VALOR INICIAL DA MODAL
    useLayoutEffect(() => {
        if (!modalRef.current) return;
        modalRef.current.style.transform = dir === 'top' ? `translateY(-100%)` : 'translateY(100%)';
        setTimeout(() => { setIsInitialized(true) }, 250);
    }, [dir]);

    // MONITORA SE A MODAL FOI ABERTA
    useLayoutEffect(() => {
        if (!modalRef.current) return;

        const dirValue = dir === 'top' ? `translateY(-100%)` : 'translateY(100%)'
        modalRef.current.style.transform = isOpen ? 'translateY(0)' : dirValue;
    }, [isOpen, dir]);

    return (
        <section
            className={className}
            ref={modalRef}
            style={{
                visibility: isInitialized ? 'visible' : 'hidden',
            }}
        >
            <ModalInternalProvider value={{ name }}>
                <article>{children}</article>
            </ModalInternalProvider>
        </section>
    );
}
