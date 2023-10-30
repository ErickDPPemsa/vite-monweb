import { useCallback } from "react";
import { Text } from "../Text";
import { useAuthStore } from "../../../stores";
import { ModalContent } from "../../interfaces/interfaces";

export const UserModalContent = ({ dialog, reference, rect }: ModalContent) => {
    const user = useAuthStore(state => state.user);
    const logOut = useAuthStore(state => state.logOut);

    const onAnimationEnd = useCallback(
        ({ currentTarget }: React.AnimationEvent<HTMLDivElement>) => {
            if (currentTarget.classList.contains('scale-down-top-right')) {
                currentTarget.classList.toggle('scale-down-top-right');
                dialog.current?.close();
            }
        },
        [dialog],
    );

    const onClickExit = useCallback(
        () => {
            reference.current?.classList.add('scale-down-top-right');
            reference.current?.addEventListener('animationend', () => {
                logOut();
            });
        },
        [reference, logOut],
    );

    return (
        <div onAnimationEnd={onAnimationEnd} ref={reference} className='user-modal scale-up-top-right' style={rect && { top: rect.bottom, right: rect.width }} >
            <section className='details'>
                <Text style={{ fontWeight: 600 }} children={user?.userName} />
                <Text className='Label-medium' children={user?.fullName} />
            </section>
            <div className='separator' />
            <section className='details details-flex '>
                <button onClick={onClickExit}>Sign off</button>
            </section>
        </div>
    )
}
