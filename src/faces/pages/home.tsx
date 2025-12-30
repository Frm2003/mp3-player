import type { ReactNode } from "react";

import ModalFiles from "../components/ModalFiles";
import ListMp3Files from "../components/ListMp3Files";
import DisplayMusic from "../components/DisplayMusic";
import MusicControl from "../components/MusicControl";
import Caurosel from "../layout/Caurosel";
import MenuMobile from "../components/MenuMobile";
import FormDownload from "../components/FormDownload";

const firstPage: ReactNode = (
    <>
        <ListMp3Files />
        <ModalFiles />
    </>
);

const secondPage: ReactNode = (
    <>
        <FormDownload />
    </>
);

export const Home = (): ReactNode => {
    return (
        <>
            <Caurosel.Body id={"s0"} >
                {[
                    firstPage,
                    secondPage,
                ]}
            </Caurosel.Body>
            <DisplayMusic />
            <MenuMobile />
            <MusicControl />
        </>
    );
};
