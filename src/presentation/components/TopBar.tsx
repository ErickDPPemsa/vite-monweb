import avatar from '../assets/avatar.jpg';
import { Menu, Settings } from '../icons/icons';
import { useTopMenu } from '../../hooks/useTopMenu';
import { ConfigModalContent, Portal, UserModalContent } from './modals';

export const TopBar = () => {
    const { handleShow, rect, userDialog, dialog, onClickImage, onClickIconConfig, onClosed, selectDialog, configDialog } = useTopMenu();

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
                    {selectDialog === 'user' && <UserModalContent dialog={dialog} reference={userDialog} rect={rect} />}
                    {selectDialog === 'config' && <ConfigModalContent dialog={dialog} reference={configDialog} />}
                </Portal>
            </section>
        </nav>
    )
}
