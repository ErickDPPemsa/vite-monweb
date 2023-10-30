import { useCallback } from "react";
import { X } from "../../icons/icons";
import { ModalContent } from "../../interfaces/interfaces";
import { FormUserRegister } from "../FormRegister";

export const CreateUserModalContent = ({ reference, dialog }: ModalContent) => {

    const onAnimationEnd = useCallback(
        ({ currentTarget }: React.AnimationEvent<HTMLDivElement>) => {
            if (currentTarget.classList.contains('scale-down-center')) {
                currentTarget.classList.toggle('scale-down-center');
                dialog.current?.close();
            }
        },
        [dialog],
    );

    return (
        <div ref={reference} className={`add-user scale-up-center`} onAnimationEnd={onAnimationEnd}>
            <span>
                <h1>Crear nuevo usuario</h1>
                <button onClick={() => reference.current?.classList.toggle('scale-down-center')} className="btn-icon">
                    <X />
                </button>
            </span>
            <FormUserRegister />
        </div >
    )
}

