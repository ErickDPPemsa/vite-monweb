import { useCallback } from "react";
import { X } from "../../icons/icons";
import { ModalContent } from "../../interfaces/interfaces";
import { FormUserRegister } from "../FormRegister";

export const CreateUserModalContent = ({ reference, dialog, onSuccess }: ModalContent) => {

    const onAnimationEnd = useCallback(
        ({ currentTarget }: React.AnimationEvent<HTMLDivElement>) => {
            if (currentTarget.classList.contains('scale-down-center')) {
                currentTarget.classList.toggle('scale-down-center');
                dialog.current?.close();
            }
        },
        [dialog],
    );

    const Success = (exit: boolean) => {
        if (exit) {
            reference.current?.classList.toggle('scale-down-center');
        }
        onSuccess && onSuccess(exit);
    }

    return (
        <div ref={reference} className={`add-user scale-up-center`} onAnimationEnd={onAnimationEnd}>
            <span>
                <h1>Crear nuevo usuario</h1>
                <button onClick={() => Success(true)} className="btn-icon">
                    <X />
                </button>
            </span>
            <FormUserRegister onSuccess={Success} />
        </div >
    )
}

