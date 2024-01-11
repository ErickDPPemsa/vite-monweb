import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "./TextField";
import { useAuthStore } from "../../stores";
import { TypeUser } from "../../interfaces";
import { SelectField } from "./SelectField";
import { useHandleError, useNewUser } from "../../hooks";
import { Spinner } from "../icons/icons";
import { PropsForm } from "../interfaces/interfaces";
import { toast } from "sonner";

type Inputs = {
    fullName: string,
    userName: string,
    password: string,
    validPassword: string,
    role: typeof options[0] | undefined,
}

const options: Array<{ value: TypeUser, label: string }> = [
    { label: 'Administrator', value: TypeUser.admin },
    { label: 'User', value: TypeUser.user }
];

export const FormUserRegister = <T extends Object>({ onSuccess }: PropsForm<T>) => {
    const user = useAuthStore(store => store.user);
    const { handleSubmit, control, reset, setError } = useForm<Inputs>({ defaultValues: { fullName: '', userName: '', password: '', validPassword: '', role: options[1] } });

    const { mutate, isLoading } = useNewUser();
    const { showError, Message } = useHandleError();

    const onSubmit: SubmitHandler<Inputs> = async ({ validPassword, role, ...rest }) => {
        if (rest.password !== validPassword) {
            setError('validPassword', { message: 'Passwords are not similar' });
        } else {
            mutate({ ...rest, role: role?.value, isActive: true }, {
                onSuccess: user => {
                    reset();
                    onSuccess && onSuccess({ exit: true });
                    toast.success(`User ${user.fullName} with username: ${user.userName} was created`)
                },
                onError: error => {
                    const err = Message(error);
                    if (err.includes('fullName')) setError('fullName', { message: err });
                    else if (err.includes('userName')) setError('userName', { message: err });
                    else if (err.includes('password')) setError('password', { message: err });
                    else showError({ responseError: error });
                }
            });
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    control={control}
                    name="fullName"
                    labelText="Full name"
                    autoCapitalize="none"
                />
                <span className="divide">
                    <TextField
                        control={control}
                        name="userName"
                        autoComplete="username"
                        labelText="User"
                    />
                    {
                        (user && user.role === TypeUser.admin) &&
                        <SelectField
                            control={control}
                            name="role"
                            labelText="User type"
                            options={options}
                        />
                    }
                </span>
                <span className="divide">
                    <TextField
                        control={control}
                        name="password"
                        labelText="Password"
                        autoComplete="current-password"
                        autoCapitalize="none"
                        type="password"
                    />
                    <TextField
                        control={control}
                        name="validPassword"
                        autoCapitalize="none"
                        labelText="Confirm password"
                        autoComplete="new-password"
                        type="password"
                    />
                </span>
                <button disabled={isLoading} className="button elevation-2" type="submit">
                    {isLoading && <Spinner classname="icon-spin" />}
                    {user ? 'Add user' : 'Create your account'}
                </button>
            </form>
        </>
    )
}
