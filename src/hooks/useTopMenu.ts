import React, { useRef, useState, useCallback } from 'react';
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

    const onClickImage = useCallback(
        ({ currentTarget }: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
            setSelectDialog('user');
            setRect(currentTarget.getBoundingClientRect());
            dialog.current?.show();
        },
        [dialog.current, setRect],
    )

    const onClickIconConfig = useCallback(
        () => {
            setSelectDialog('config');
            dialog.current?.show();
        },
        [dialog.current],
    )

    const onClosed = useCallback(
        (close: boolean) => {
            (close) &&
                (selectDialog === 'user')
                ? userDialog.current?.classList.add('scale-down-top-right')
                : configDialog.current?.classList.add('scale-down-horizontal-right');
        },
        [selectDialog, dialog.current],
    )

    return { rect, dialog, handleShow, user, LogOut, userDialog, onClickImage, onClickIconConfig, onClosed, selectDialog, configDialog }
}