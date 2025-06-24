import { type ChangeEvent } from 'react';

import { useModalContext } from '../../layout/Modal/context/ModalContext';
import Musica from '../../utils/Musica';
import Modal from '../../layout/Modal';
import { useListFileContext } from '../../contexts/ListFileContext';

import style from './styles/style.module.css';

export default function ModalFiles() {
    const { setList } = useListFileContext();
    const { setShow } = useModalContext();

    const loadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files;

        if (files) {
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
        }
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
