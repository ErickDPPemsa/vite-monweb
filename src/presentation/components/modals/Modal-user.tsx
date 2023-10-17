import { useLayoutEffect, useRef } from "react";
import { Text } from "../Text";
import { TypeScale } from "../../interfaces/types";
import { useAuthStore } from "../../../stores";

interface Props {
    view: boolean;
    setView: React.Dispatch<React.SetStateAction<boolean>>;
    rect: DOMRect | undefined;
}

export const ModalUser = ({ view, rect, setView }: Props) => {
    const userModal = useRef<HTMLDivElement>(null);
    const LogOut = useAuthStore(state => state.logOut);
    const user = useAuthStore(state => state.user);

    const close = () => ({ logOut = false }: { logOut?: boolean }) => {
        setView(false);
        logOut && LogOut();
    }

    useLayoutEffect(() => {
        if (view && userModal) {
            userModal.current?.classList.add('user-modal-show');
        } else {
            userModal.current?.classList.remove('user-modal-show');
        }
    }, [view, userModal]);

    return (
        <div ref={userModal} className='user-modal' style={{ top: (rect?.bottom ?? 0) + 15, right: rect?.width ?? 1 }}>
            <section className='details'>
                <Text style={{ fontWeight: 600 }} variant={TypeScale.body_large} children={user?.userName} />
                <Text variant={TypeScale.body_small} children={user?.fullName} />
            </section>
            <div className='separator' />
            <button className='option' children={<Text variant={TypeScale.title_small} children='Cerrar Sesion' />} onClick={() => close()({ logOut: true })} />
        </div>
    )
}
