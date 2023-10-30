import { useCallback } from "react";
import { Colors } from "../../../config/colors";
import { ThemeMode } from "../../../interfaces";
import { useThemeStore } from "../../../stores";
import { Moon, Palette, Sun } from "../../icons/icons";
import { ModalContent } from "../../interfaces/interfaces"
import { Text } from "../Text";

export const ConfigModalContent = ({ dialog, reference }: ModalContent) => {

    const mode = useThemeStore(state => state.mode);
    const updateMode = useThemeStore.getState().updateMode;
    const updateColor = useThemeStore.getState().updateColor;

    const onAnimationEnd = useCallback(
        ({ currentTarget }: React.AnimationEvent<HTMLDivElement>) => {
            if (currentTarget.classList.contains('scale-down-horizontal-right')) {
                currentTarget.classList.toggle('scale-down-horizontal-right');
                dialog.current?.close();
            }
        },
        [dialog],
    );

    return (
        <aside ref={reference} onAnimationEnd={onAnimationEnd} className='config scale-up-horizontal-right' >
            <div className='config_theme'>
                <Text>Theme mode</Text>
                <section>
                    <button onClick={() => updateMode(ThemeMode.light)} className={mode === ThemeMode.light ? 'active' : ''}>
                        <Sun />
                        <span>Light</span>
                    </button>
                    <button onClick={() => updateMode(ThemeMode.dark)} className={mode === ThemeMode.dark ? 'active' : ''}>
                        <Moon />
                        <span>Dark</span>
                    </button>
                    <button onClick={() => updateMode(ThemeMode.system)} className={mode === ThemeMode.system ? 'active' : ''}>
                        <Palette />
                        <span>System</span>
                    </button>
                </section>
            </div>

            <div className='config_colors'>
                <Text>Colors</Text>
                <section>
                    <button onClick={() => updateColor(Colors.primary)} style={{ color: Colors.primary }} className='btn-icon' children={<Palette />} />
                    <button onClick={() => updateColor('#7c46a3')} style={{ color: '#7c46a3' }} className='btn-icon' children={<Palette />} />
                    <button onClick={() => updateColor('#2b165c')} style={{ color: '#2b165c' }} className='btn-icon' children={<Palette />} />
                    <button onClick={() => updateColor('#3ca3e4')} style={{ color: '#3ca3e4' }} className='btn-icon' children={<Palette />} />
                    <button onClick={() => updateColor('#59596a')} style={{ color: '#59596a' }} className='btn-icon' children={<Palette />} />
                    <button onClick={() => updateColor('#000')} style={{ color: '#000' }} className='btn-icon' children={<Palette />} />
                    <button onClick={() => updateColor('#6b9267')} style={{ color: '#6b9267' }} className='btn-icon' children={<Palette />} />
                </section>
                <button className='button-small'>Set default</button>
            </div>
        </aside>
    )
}
