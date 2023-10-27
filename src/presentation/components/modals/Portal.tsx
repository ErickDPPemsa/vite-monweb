import React from 'react'
import { createPortal } from 'react-dom'
interface Props extends Omit<
    React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>,
    'ref' | 'style'> {
    refElement: React.RefObject<HTMLDialogElement>;
    onClosed?: (close: boolean) => void;
}
export const Portal = ({ refElement, children, onClosed, className, ...props }: Props) => {
    const Element = document.getElementById('show-modal') ?? document.body;

    return (
        createPortal(
            <dialog className={`container-dialog ${className}`} {...props} ref={refElement}>
                <div className='content'>
                    <div className='full' onClick={() => onClosed && onClosed(true)} />
                    {children}
                </div>
            </dialog>,
            Element
        )
    )
}
