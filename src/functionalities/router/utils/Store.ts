import type { Route } from "../types";

class Store {
    private routes: Route[] = [];
    private currentParams: Record<string, string> = {};

    public setRoutes = (routes: Route[]): void => {
        this.routes = routes;
    }

    public getRoutes = (): Route[] => {
        return this.routes;
    }

    public getParams = <T>(): T => {
        return this.currentParams as T;
    }

    public setParam = (params: Record<string, string>): void => {
        this.currentParams = params;
    };
}

const storeInstance = new Store();
export const store = storeInstance;