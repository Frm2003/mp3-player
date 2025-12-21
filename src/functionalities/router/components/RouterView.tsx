import { useEffect, useState } from "react";
import { getCurrentPath, matchRoute } from "../utils/methods";

export const RouterView = () => {
    const [currentPath, setCurrentPath] = useState(getCurrentPath());

    useEffect(() => {
        const onPopState = () => setCurrentPath(getCurrentPath());
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const matched = matchRoute(currentPath);

    if (!matched) return <div>404</div>;

    const { Component, params } = matched;

    return <Component key={Component.name} params={params} />;
};