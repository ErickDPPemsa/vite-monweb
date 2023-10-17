import { useEffect } from "react";
import { AuthStatus, ThemeMode } from "../interfaces";
import { useThemeStore } from "../stores/theme/theme.store";
import { useAuthStore } from "../stores";

export const useSetColors = () => {
    const root = document.documentElement;
    const colors = useThemeStore(state => state.colors);
    const mode = useThemeStore(state => state.mode);
    const updateStatus = useAuthStore(state => state.updateStatus);

    return (
        useEffect(() => {
            const isDarkSystem: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
            Object.entries(colors).map(color => root.style.setProperty(`--color-${color[0]}`, `${color[1]}`));
            (mode === ThemeMode.system) ?
                (isDarkSystem)
                    ? root.setAttribute("data-theme", "theme-dark")
                    : root.setAttribute("data-theme", "theme-light")
                : (mode === ThemeMode.light)
                    ? root.setAttribute("data-theme", "theme-light")
                    : root.setAttribute("data-theme", "theme-dark");
        }, [mode])
        ,
        useEffect(() => {
            updateStatus(AuthStatus.pending);
        }, [])

    )
}
