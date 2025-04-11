import { useAuthStore, useThemeStore } from "../stores";
export function useTopMenu() {
    const LogOut = useAuthStore(state => state.logOut);
    const user = useAuthStore(state => state.user);
    const updateMode = useThemeStore(store => store.updateMode);
    const mode = useThemeStore(store => store.mode);


    return { user, LogOut, updateMode, mode}
}