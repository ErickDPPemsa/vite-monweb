import React, { useRef, useState, useCallback, AnimationEvent } from 'react';
import { useAuthStore } from "../stores";
type Dialogs = 'user' | 'config';
export function useTopMenu() {
    const LogOut = useAuthStore(state => state.logOut);
    const user = useAuthStore(state => state.user);
    const [selectDialog, setSelectDialog] = useState<Dialogs>();

    const dialog = useRef<HTMLDialogElement>(null);
    const userDialog = useRef<HTMLDivElement>(null);
    const configDialog = useRef<HTMLDivElement>(null);

    const [rect, setRect] = useState<DOMRect>();

    const handleShow = () => {
        const nav = document.querySelector('.container-nav');
        nav?.classList.toggle('handle-show')
    }

    const onAnimationEnd = useCallback(
        ({ currentTarget }: AnimationEvent<HTMLDivElement>) => {
            if (currentTarget.classList.contains('scale-up-top-right')) {
                currentTarget.classList.remove('scale-up-top-right');
            }
            if (currentTarget.classList.contains('scale-down-top-right')) {
                currentTarget.classList.remove('scale-down-top-right');
                dialog.current?.close();
            }
        },
        [dialog],
    );

    const onClickExit = useCallback(
        () => {
            userDialog.current?.classList.add('scale-down-top-right');
            userDialog.current?.addEventListener('animationend', () => {
                LogOut();
            });
        },
        [userDialog, LogOut],
    );

    const onClickImage = useCallback(
        ({ currentTarget }: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
            setSelectDialog('user');
            setRect(currentTarget.getBoundingClientRect());
            dialog.current?.show();
        },
        [dialog.current, setRect],
    )

    const onClickIconConfig = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event;
            setSelectDialog('config');
            dialog.current?.show();
        },
        [dialog.current],
    )

    const onClosed = useCallback(
        (close: boolean) => {
            if (close) {

                switch (selectDialog) {
                    case 'user':
                        userDialog.current?.classList.add('scale-down-top-right');
                        break;

                    // case 'config':
                    //     dialog.current?.close();
                    //     break;

                    default:
                        dialog.current?.close();
                        break;
                }
            }
        },
        [selectDialog, dialog.current],
    )



    return { rect, dialog, handleShow, user, LogOut, userDialog, onAnimationEnd, onClickExit, onClickImage, onClickIconConfig, onClosed, selectDialog, configDialog }
}