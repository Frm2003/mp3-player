import type { Route } from "../types";
import { store } from "../utils/Store";

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export const createRouter = (newRoutes: Route[]): void => {
    store.setRoutes(newRoutes);
};

export const getCurrentPath = () => {
    const fullPath = window.location.pathname;
    const path = fullPath.startsWith(BASE) ? fullPath.slice(BASE.length) : fullPath;
    return path || '/';
};

export const matchRoute = (path: string): { Component: React.FC<any>, params: string[] } | undefined => {
    for (const route of store.getRoutes()) {
        const templateSegments = route.path.split('/').filter(Boolean);
        const pathSegments = path.split('/').filter(Boolean);

        if (templateSegments.length !== pathSegments.length) continue;

        const matched = templateSegments.every((seg, i) => seg.startsWith(':') || seg === pathSegments[i]);

        if (!matched) continue;

        const params = templateSegments.map((seg, i) =>
            seg.startsWith(':') ? pathSegments[i] : null
        ).filter(Boolean) as string[];

        store.setParam(
            Object.fromEntries(
                templateSegments
                    .map((seg, i) => (seg.startsWith(':') ? [seg.slice(1), pathSegments[i]] : null))
                    .filter(Boolean) as [string, string][]
            )
        );

        return {
            Component: route.component,
            params
        };
    }
};
