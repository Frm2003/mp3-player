import { createRoot } from 'react-dom/client'
import { RouterView } from './router/components/RouterView'
import { routes } from './router';
import { createRouter } from './router/utils/methods';

import './assets/var.css';
import './assets/global.css';
import { PlayerProvider } from './contexts/playerContext';
import { ListFileProvider } from './contexts/ListFileContext';

// ROUTER INSTANCE
createRouter(routes);

createRoot(document.getElementById('root')!).render(
  <PlayerProvider>
    <ListFileProvider>
      <RouterView />
    </ListFileProvider>
  </PlayerProvider>
)
