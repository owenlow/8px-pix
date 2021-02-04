import { useLocation } from "react-router-dom";

export function useQuery<
    T extends {
        [Key in keyof T]?: string;
    } = {}
>() {
    const params = new URLSearchParams(useLocation().search);
    return Object.fromEntries(params.entries());
}
