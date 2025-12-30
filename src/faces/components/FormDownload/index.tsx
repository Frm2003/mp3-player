import { useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

import useFilesHook from "../../../functionalities/hooks/useFilesHook";

import './styles/style.css';

export default function FormDownload(): ReactNode {
    const { streamFileAudio } = useFilesHook();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        setIsLoading(true);
        await streamFileAudio(event);
        setIsLoading(false);
    };

    useLayoutEffect(() => {
        const calcHeight = (): void => {
            if (!formRef.current) return;

            const height = window.innerHeight
            formRef.current.style.height = `${height - 180}px`;
        };

        calcHeight();
        window.addEventListener('resize', calcHeight);

        return () => {
            window.removeEventListener('resize', calcHeight);
        };
    }, []);

    return (
        <>
            <div className='title'>
                <h2>Dowload de arquivos</h2>
            </div>
            <form className={'formDownload'} onSubmit={onSubmit} ref={formRef}>
                <div className={'body'}>
                    <h3>Conversão de Áudio</h3>
                    <p>Insira um link de um vídeo</p>
                    <input name="url" type="text" />
                    <div className={'btnContainer'}>
                        <button type="submit">Enviar</button>
                    </div>
                </div>
            </form>

            {isLoading && (
                <div className="formLoading">
                    <FontAwesomeIcon icon={faRotateRight} size={'4x'} />
                </div>
            )}
        </>
    );
}