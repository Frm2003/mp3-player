import { type ChangeEvent } from 'react';

import { useModalContext } from '../../layout/Modal/context/ModalContext';
import { useListFileContext } from '../../contexts/ListFileContext';

import Modal from '../../layout/Modal';
import Musica from '../../utils/Musica';

import style from './styles/style.module.css';

export default function ModalFiles() {
    const { fileList } = useListFileContext();
    const { setShow } = useModalContext();

    const loadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files as FileList;

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

            fileList.push(newMusic);
        }

        setShow(false);
    };

    return (
        <>
            <Modal.Root>
                <div className={style.layout}>
                    <Modal.Title title={'Selecione os arquivos'} />
                    <Modal.Body>
                        <h4>Selecione os arquivos mp3 para reprodução</h4>
                        <label htmlFor={'files'}>
                            <p>Selecione os arquivos</p>
                        </label>
                        <input
                            id={'files'}
                            onChange={loadFile}
                            type={'file'}
                            multiple
                        />
                    </Modal.Body>
                </div>
            </Modal.Root >
        </>
    );
}

/*
    for (const file of files) {
                const [artista, nome] = file.name
                    .replace('.mp3', '')
                    .split('-');

                const arquivo = URL.createObjectURL(file);

                const musicaNova = new Musica(
                    nome,
                    '',
                    artista,
                    arquivo,
                    'mp3'
                );

                setList((prevList: Musica[]) => [...prevList, musicaNova]);
            }

            setShow(false);
*/