import type { ChangeEvent } from "react";

import { useListFileContext } from "../contexts/ListFileContext";
import Musica from "../../utils/Musica";
import { useModalContext } from "../../faces/layout/Modal/context/ModalContext";

export default function useFilesHook() {
    const { fileList, setFileList } = useListFileContext();
    const { setModal } = useModalContext();

    // METODOS
    const closeModalFiles = (): void => { setModal('ModalFiles', false); }

    const loadFiles = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files as FileList;
        const musics: Musica[] = [];

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

            musics.push(newMusic);
        }

        setFileList(prevState => [...prevState, ...musics]);
        closeModalFiles();
    };

    return {
        loadFiles,
        fileList,
        closeModalFiles,
    };
}