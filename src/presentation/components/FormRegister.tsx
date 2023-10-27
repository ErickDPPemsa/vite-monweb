import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "./TextField";
import { useAuthStore } from "../../stores";
import { TypeUser } from "../../interfaces";
import { SelectField } from "./SelectField";

type Inputs = {
    fullName: string,
    userName: string,
    password: string,
    validPassword: string,
    role: { label: string, value: TypeUser } | undefined,
}

export const FormUserRegister = () => {
    const user = useAuthStore(store => store.user);
    const { handleSubmit, control, reset } = useForm<Inputs>({ defaultValues: { fullName: '', userName: '', password: '', validPassword: '', role: undefined } });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        alert(JSON.stringify(data, null, 3));
        reset();
    };

    const options: Array<{ value: TypeUser, label: string }> = [
        { label: 'Administrator', value: TypeUser.admin },
        { label: 'User', value: TypeUser.user }
    ]

    return (
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
            <input className="button elevation-2" type="submit" value="Create your account" />
        </form>
    )
}
