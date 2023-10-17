import { useLayoutEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import avatar from '../assets/avatar.jpg';
import { HandleTheme } from './HandleTheme';
import { Modal, ModalUser } from './modals';
import { IconMenu } from './IconMenu';

export const TopBar = () => {
    const image = useRef<HTMLImageElement>(null);
    const [rect, setRect] = useState<DOMRect>();
    const [view, setView] = useState<boolean>(false);
    const Element = document.getElementById('show-modal');


    const show = () => {
        setView(true);
    }

    useLayoutEffect(() => {
        if (image.current) {
            setRect(image.current.getBoundingClientRect());
        }
    }, [, image.current, view]);

    return (
        <header className="container-top-menu">
            <section className='section-left'>
                <IconMenu />
            </section>
            <section className='section-right'>
                <HandleTheme />
                <img ref={image} onClick={show} className='elevation-5' src={avatar} alt="user" />
                {
                    createPortal(
                        <Modal view={view} setView={setView}>
                            <ModalUser view={view} setView={setView} rect={rect} />
                        </Modal>
                        , Element ?? document.body
                    )
                }
            </section>
        </header>
    )
}
