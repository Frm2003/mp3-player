import {
    faDownload,
    faFileAudio,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Caurosel from '../../layout/Caurosel';

import './styles/style.css';

export default function MenuMobile() {
    return (
        <nav className={'menuMobile'}>
            <ul>
                <li>
                    <Caurosel.CustomControl id={'s0'} page={0}>
                        <FontAwesomeIcon icon={faFileAudio} size={'xl'} />
                    </Caurosel.CustomControl>
                </li>
                <li>
                    <Caurosel.CustomControl id={'s0'} page={1}>
                        <FontAwesomeIcon icon={faDownload} size={'xl'} />
                    </Caurosel.CustomControl>
                </li>
            </ul>
        </nav>
    );
}
