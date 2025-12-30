import type { ChangeEvent, FormEvent } from "react";

import { downloadFile, getInfo, streamFile } from "../services/AudioService";

import { useListFileContext } from "../contexts/ListFileContext";
import { useModalContext } from "../../faces/layout/Modal/context/ModalContext";

import Musica from "../../utils/Musica";

export default function useFilesHook() {
    const { fileList, setFileList } = useListFileContext();
    const { setModal } = useModalContext();

    // METODOS
    const closeModalFiles = (): void => { setModal('ModalFiles', false); }

    const loadLocalFiles = async (event: ChangeEvent<HTMLInputElement>) => {
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

    const streamFileAudio = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const bodyRequest: Record<string, FormDataEntryValue | null> = {
            url: formData.get("url"),
        };

        const fileInfo = await getInfo(bodyRequest);
        await downloadFile(bodyRequest);

        const audioUrl = await streamFile();
        const newMusic = new Musica(fileInfo.fileName, "", fileInfo.uploader, audioUrl, 'youtube')

        setFileList(prevState => [...prevState, newMusic]);
    };

    return {
        closeModalFiles,
        fileList,
        streamFileAudio,
        loadLocalFiles,
    };
}