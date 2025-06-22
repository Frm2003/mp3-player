import type { ReactNode } from "react";

import Caurosel from "../layout/Caurosel";
import Modal from "../layout/Modal";

import MenuMobile from "../components/MenuMobile";
import ModalFiles from "../components/ModalFiles";
import ListMp3Files from "../components/ListMp3Files";
import PlayerControl from "../components/PlayerControl";

const firstPage: ReactNode = (
    <Modal.Provider>
        <ListMp3Files />
        <ModalFiles />
    </Modal.Provider>
);

export const Home = (): ReactNode => {
    return (
        <>
            <Caurosel.Body id={'s0'}>
                {firstPage}
                <div>teste B</div>
            </Caurosel.Body>
            <PlayerControl />
            <MenuMobile />
        </>
    );
};
