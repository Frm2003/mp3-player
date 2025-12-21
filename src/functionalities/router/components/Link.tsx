import type { LinkProps } from "../types";
import { useRouter } from "../utils/Router";

export const Link = ({ to, children }: LinkProps) => {
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        router.push({ path: to });
    };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    );
};