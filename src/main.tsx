import { createRoot } from 'react-dom/client'

import './faces/assets/var.css';
import './faces/assets/global.css';

import { PlayerProvider } from './functionalities/contexts/playerContext';
import { ListFileProvider } from './functionalities/contexts/ListFileContext';
import { RouterView } from './functionalities/router/components/RouterView';

import Modal from './faces/layout/Modal';

import { createRouter } from './functionalities/router/utils/methods';
import { routes } from './functionalities/router';

createRouter(routes);

createRoot(document.getElementById('root')!).render(
    <PlayerProvider>
        <ListFileProvider>
            <Modal.Provider>
                <RouterView />
            </Modal.Provider>
        </ListFileProvider>
    </PlayerProvider>
)
