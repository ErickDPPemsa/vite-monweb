import { useCallback } from "react";
import { Colors } from "../../../config/colors";
import { ThemeMode } from "../../../interfaces";
import { useThemeStore } from "../../../stores";
import { Home, Moon, Palette, Sun, AddUser, CalendarStart, Caret, CheveronLeft, Clock1, CloudDownload, Delete, InOut, Menu, Panel, Pencil, Search, Settings, Spinner, Ticket, Users, X, Circle } from "../../icons/icons";
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
                    <button onClick={() => updateColor(Colors.primary)} style={{ color: Colors.primary }} className='btn-icon' children={<Circle />} />
                    <button onClick={() => updateColor('#002f6c')} style={{ color: '#002f6c' }} className='btn-icon' children={<Circle />} />
                    <button onClick={() => updateColor('#097188')} style={{ color: '#097188' }} className='btn-icon' children={<Circle />} />
                    <button onClick={() => updateColor('#7c46a3')} style={{ color: '#7c46a3' }} className='btn-icon' children={<Circle />} />
                    <button onClick={() => updateColor('#a87bc7')} style={{ color: '#a87bc7' }} className='btn-icon' children={<Circle />} />
                    <button onClick={() => updateColor('#04293A')} style={{ color: '#04293A' }} className='btn-icon' children={<Circle />} />
                    <button onClick={() => updateColor('#1E5128')} style={{ color: '#1E5128' }} className='btn-icon' children={<Circle />} />
                    <button onClick={() => updateColor('#420516')} style={{ color: '#420516' }} className='btn-icon' children={<Circle />} />
                    <button onClick={() => updateColor('#000')} style={{ color: '#000' }} className='btn-icon' children={<Circle />} />
                </section>
                <button className='button-small' onClick={() => updateColor(Colors.primary)}>Set default</button>
            </div>
            <div>
                <Text>Icons</Text>
                <section>
                    <Home />
                    <Panel />
                    <Ticket />
                    <InOut />
                    <Clock1 />
                    <Sun />
                    <Moon />
                    <Menu />
                    <Users />
                    <CalendarStart />
                    <Search />
                    <AddUser />
                    <CheveronLeft />
                    <X />
                    <Delete />
                    <Settings />
                    <Palette />
                    <Spinner />
                    <Caret />
                    <CloudDownload />
                    <Pencil />
                    <Circle />
                </section>
            </div>
        </aside>
    )
}
