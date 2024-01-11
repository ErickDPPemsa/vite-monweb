import { useCallback } from 'react';
import { ModalContent } from '../../interfaces/interfaces';
import { X } from '../../icons/icons';
import { Text } from '../Text';

export const DeleteUserModalContent = <T extends Object>({ reference, dialog, onSuccess, fullName, userName, value, setValue }: ModalContent<T> & {
    fullName: keyof T;
    userName: keyof T;
    value: T | undefined;
    setValue: React.Dispatch<React.SetStateAction<T | undefined>>;
}) => {

    const onAnimationEnd = useCallback(
        ({ currentTarget }: React.AnimationEvent<HTMLDivElement>) => {
            if (currentTarget.classList.contains('scale-down-center')) {
                currentTarget.classList.toggle('scale-down-center');
                dialog.current?.close();
                setValue(undefined);
            }
        },
        [dialog],
    );

    const Success = useCallback(
        (exit: boolean) => () => {
            onSuccess && onSuccess({ exit, value });
            reference.current?.classList.toggle('scale-down-center');
        },
        [reference.current],
    );

    return (
        <div ref={reference} className={`delete-user scale-up-center`} onAnimationEnd={onAnimationEnd}>
            <span>
                <h1>Delete user</h1>
                <button onClick={Success(false)} className="btn-icon">
                    <X />
                </button>
            </span>
            <div className='content-alert'>
                <Text variant='Title-medium'>Are you sure to delete this user?</Text>
                <Text><b>Name:</b> {value && String(value[fullName])}</Text>
                <Text><b>Username:</b> {value && String(value[userName])}</Text>
                <span>
                    <button className='button-small cancel' onClick={Success(false)}>cancel</button>
                    <button className='button-small' onClick={Success(true)}>yes</button>
                </span>
            </div>
        </div >
    )
}
