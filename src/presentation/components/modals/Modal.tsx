import { useEffect, useRef } from "react";

interface ModalProps {
    view: boolean;
    setView: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

export const Modal = ({ children, view, setView }: ModalProps) => {
    const ModalContent = useRef<HTMLElement>(null);
    const close = () => {
        setView(false);
    }

    useEffect(() => {
        if (view) {
            ModalContent.current?.classList.add('container-modal-show');
        } else {
            setTimeout(() => {
                ModalContent.current?.classList.remove('container-modal-show');
            }, 100);
        }
        return () => {

        }
    }, [view]);

    return (
        <section ref={ModalContent} className='container-modal'>
            <div className='full-modal-size'>
                <div className='click-area' onClick={close} />
                {children}
            </div>
        </section >
    )
}