import type { Route } from "../types";
import { store } from "./Store";

class Router {
    public push = (route: Pick<Route, 'path'>): void => {
        const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
        const normalizedPath = route.path.startsWith('/') ? route.path : '/' + route.path;
        const fullPath = `${base}${normalizedPath}`.replace(/\/{2,}/g, '/');

        window.history.pushState({}, '', fullPath);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    public back = (): void => {
        window.history.back();
    };

    public getParams = <T>(): T => {
        return store.getParams() as T;
    }
};

const routerInstance = new Router();
export const useRouter = () => routerInstance;