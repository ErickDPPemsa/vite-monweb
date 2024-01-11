import { useCallback } from "react";
import { X } from "../../icons/icons";
import { ModalContent } from "../../interfaces/interfaces";
import { FormUserRegister } from "../FormRegister";

export const CreateUserModalContent = <T extends Object>({ reference, dialog, onSuccess }: ModalContent<T>) => {

    const onAnimationEnd = useCallback(
        ({ currentTarget }: React.AnimationEvent<HTMLDivElement>) => {
            if (currentTarget.classList.contains('scale-down-center')) {
                currentTarget.classList.toggle('scale-down-center');
                dialog.current?.close();
            }
        },
        [dialog],
    );

    const Success = useCallback(
        (exit: boolean) => {
            if (exit && reference.current) {
                reference.current.classList.toggle('scale-down-center');
            }
            onSuccess && onSuccess({ exit });
        },
        [reference.current],
    )

    return (
        <div ref={reference} className={`add-user scale-up-center`} onAnimationEnd={onAnimationEnd}>
            <span>
                <h1>Create user</h1>
                <button onClick={() => Success(true)} className="btn-icon">
                    <X />
                </button>
            </span>
            <FormUserRegister onSuccess={({ exit }) => Success(exit)} />
        </div>
    )
}

