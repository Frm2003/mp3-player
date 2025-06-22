import { Config } from "../pages/config";
import { Home } from "../pages/home";

export const routes = [
    { path: '', component: Home },
    { path: '/', component: Home },
    { path: '/config', component: Config }
];
