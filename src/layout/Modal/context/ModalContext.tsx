import { createContext, type FC, type ReactNode, useContext, useState } from 'react';

interface ModalState {
    [modalName: string]: boolean;
}

interface iContext {
    modals: ModalState;
    setModal: (name: string, value: boolean) => void;
}

const ModalContext = createContext<iContext>({
    modals: {},
    setModal: () => { },
});

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [modals, setModals] = useState<ModalState>({});

    const setModal = (name: string, value: boolean): void => {
        setModals(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <ModalContext.Provider value={{ modals, setModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = (): iContext => useContext(ModalContext);

/* ------------------------------------------------------------------- */

const ModalInternalContext = createContext<{ name: string } | null>(null);

export const useModalInternalContext = () => {
    const ctx = useContext(ModalInternalContext);
    if (!ctx) throw new Error("Modal.Title must be used within Modal.Root");
    return ctx;
};

export const ModalInternalProvider = ModalInternalContext.Provider;