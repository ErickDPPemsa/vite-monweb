import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthService } from "../../../services/auth.service";
import { toast } from "sonner";
import { Text } from "../../components/Text";
import { TypeScale } from "../../interfaces/types";
import { TextField } from "../components/TextField";
import { Link } from "react-router-dom";


type Inputs = {
    userName: string,
    password: string,
    validPassword: string,
}

const RegisterPage = () => {
    const { handleSubmit, control } = useForm<Inputs>({ defaultValues: { userName: '', password: '' } });

    const { isLoading, mutate } = useMutation([], AuthService.register, {
        retry: 0,
        onError: async err => toast.error(`${err}`),
        onSuccess: ({ createdAt, updatedAt, token, ...rest }) => { rest },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        mutate(data);
    };

    return (
        <article>
            {isLoading && <div style={{ position: 'absolute', zIndex: 1, top: 0 }}>loading... </div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className={`form-container_text text-color ${TypeScale.headline_medium}`}>Crear una cuenta</h1>
                <Text variant={TypeScale.body_medium} className="text-color" style={{ margin: '1rem 0' }}>Complete los campos a continuación para crear una cuenta</Text>
                <TextField
                    control={control}
                    name="userName"
                    labelText="User"
                />
                <span style={{ display: 'flex', gap: '1rem' }}>
                    <TextField
                        control={control}
                        name="password"
                        labelText="Password"
                        type="password"
                    />
                    <TextField
                        control={control}
                        name="validPassword"
                        labelText="Confirma contraseña"
                        type="password"
                    />
                </span>
                <input className="button elevation-2" type="submit" value="Regitrar usuario" />
                <div style={{ margin: '1rem 0' }} className="separator">
                    <Text variant={TypeScale.title_small} children="o" />
                </div>
            </form>
            <Text style={{ marginTop: '1rem' }} variant={TypeScale.label_large} className="custom-text text-color">¿Ya tienes una cuenta?<Link replace to={'/auth/login'}><span style={{ marginLeft: '.5rem' }}>Inicie sesion aquí</span></Link></Text>
        </article >
    )
}

export default RegisterPage;
