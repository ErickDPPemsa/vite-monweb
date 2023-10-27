import { useCallback } from 'react';
import avatar from '../assets/avatar.jpg';
import { Menu, Moon, Palette, Settings, Sun } from '../icons/icons';
import { useTopMenu } from '../../hooks/useTopMenu';
import { Portal } from './modals';
import { Text } from './Text';
import { useThemeStore } from '../../stores';
import { ThemeMode } from '../../interfaces';
import { Colors } from '../../config/colors';

export const TopBar = () => {
    const { handleShow, rect, userDialog, user, dialog, onAnimationEnd, onClickExit, onClickImage, onClickIconConfig, onClosed, selectDialog, configDialog } = useTopMenu();

    const ModalUser = useCallback(() =>
    (
        <div onAnimationEnd={onAnimationEnd} ref={userDialog} className='user-modal scale-up-top-right' style={rect && { top: rect.bottom, right: rect.width }} >
            <section className='details'>
                <Text style={{ fontWeight: 600 }} children={user?.userName} />
                <Text className='Label-medium' children={user?.fullName} />
            </section>
            <div className='separator' />
            <section className='details details-flex '>
                <button onClick={onClickExit}>Sign off</button>
            </section>
        </div>
    ), [rect, userDialog, onClickExit, onAnimationEnd, user]
    );

    const ModalConfig = useCallback(() => {
        const mode = useThemeStore(state => state.mode);
        const updateMode = useThemeStore.getState().updateMode;
        const updateColor = useThemeStore.getState().updateColor;
        return (
            <aside ref={configDialog} className='config scale-up-horizontal-right ' >

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
                        <button onClick={() => updateColor('rgb(0, 90, 138)')} style={{ color: 'rgb(0, 90, 138)' }} className='btn-icon' children={<Palette />} />
                        <button onClick={() => updateColor('#002d7c')} style={{ color: '#002d7c' }} className='btn-icon' children={<Palette />} />
                        <button onClick={() => updateColor('#a8b600')} style={{ color: '#a8b600' }} className='btn-icon' children={<Palette />} />
                        <button onClick={() => updateColor('#00acc0')} style={{ color: '#00acc0' }} className='btn-icon' children={<Palette />} />
                        <button onClick={() => updateColor('#000')} style={{ color: '#000' }} className='btn-icon' children={<Palette />} />
                        <button onClick={() => updateColor('#525252')} style={{ color: '#525252' }} className='btn-icon' children={<Palette />} />
                    </section>
                </div>
            </aside>
        )
    }
        , [configDialog]
    );

    return (
        <nav className="container-top-menu">
            <section className='section-left'>
                <button className='btn-icon' onClick={handleShow}>
                    <Menu />
                </button>
            </section>
            <section className='section-right'>
                <button className='btn-icon' onClick={onClickIconConfig}>
                    <Settings classname='icon-rotate' />
                </button>
                <img src={avatar} onClick={onClickImage} alt="user" />
                <Portal className='blur-1' refElement={dialog} onClosed={onClosed}>
                    {selectDialog === 'user' && <ModalUser />}
                    {selectDialog === 'config' && <ModalConfig />}
                </Portal>
            </section>
        </nav>
    )
}
