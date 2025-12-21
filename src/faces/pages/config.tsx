import type { ReactNode } from "react";
import { useRouter } from "../../router/utils/Router";

export const Config = (): ReactNode => {
    const router = useRouter();

    const click = (): void => {
        router.push({ path: '/' });
    };

    return (
        <>
            <div>config...</div>
            <a onClick={click}>teste</a>
        </>
    );
};