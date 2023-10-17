import { useThemeStore } from '../../stores/theme/theme.store';
import { Moon, Sun } from '../icons/icons';
import { ThemeMode } from '../../interfaces/enums';


export const HandleTheme = () => {
    const mode = useThemeStore(state => state.mode);
    const updateMode = useThemeStore(state => state.updateMode);
    return (
        <button
            className='btn-icon'
            onClick={() => (mode === ThemeMode.light) ? updateMode(ThemeMode.dark) : updateMode(ThemeMode.light)}
        >
            {(mode === ThemeMode.light) ? <Moon /> : <Sun />}
        </button>
    )
}
