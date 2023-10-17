import { StateCreator, create } from "zustand";
import { ThemeMode, ThemeState } from "../../interfaces";
import { Colors } from "../../config/colors";
import { devtools, } from "zustand/middleware";


const storeApi: StateCreator<ThemeState> = (set) => ({
    colors: Colors,
    mode: ThemeMode.system,

    updateMode: (mode) => set({ mode }),
});

export const useThemeStore = create<ThemeState>()(
    devtools(
        storeApi
    )
);