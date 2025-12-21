export type Route = {
    path: string;
    component: (...args: any[]) => React.ReactNode;
};

export type LinkProps = {
    to: string;
    children: React.ReactNode;
};