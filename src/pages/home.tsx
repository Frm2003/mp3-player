import type { ReactNode } from "react";

import ModalFiles from "../components/ModalFiles";
import ListMp3Files from "../components/ListMp3Files";
import DisplayMusic from "../components/DisplayMusic";
import MusicControl from "../components/MusicControl";

const firstPage: ReactNode = (
    <>
        <ListMp3Files />
        <ModalFiles />
    </>
);

export const Home = (): ReactNode => {
    return (
        <>
            {firstPage}
            <DisplayMusic />
            <MusicControl />
        </>
    );
};
