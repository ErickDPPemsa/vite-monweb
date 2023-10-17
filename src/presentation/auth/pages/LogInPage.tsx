import { SubmitHandler, useForm } from "react-hook-form";
import { Text } from '../../components/Text';
import { TypeScale } from "../../interfaces/types";
import { Link } from "react-router-dom";
import { TextField } from "../components/TextField";
import { AuthService } from "../../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../../../stores";

type InputsLogIn = {
  userName: string,
  password: string
}

const LogInPage = () => {
  const { handleSubmit, control } = useForm<InputsLogIn>({ defaultValues: { userName: '', password: '' } });
  const logIn = useAuthStore(state => state.logIn);

  const { isLoading, mutate } = useMutation([], AuthService.login, {
    retry: 0,
    onError: async err => toast.error(`${err}`),
    onSuccess: ({ createdAt, updatedAt, token, ...rest }) => logIn(rest, token),
  });

  const onSubmit: SubmitHandler<InputsLogIn> = async (data) => {
    mutate(data);
  };

  return (
    <article>
      {isLoading && <div style={{ position: 'absolute', zIndex: 1, top: 0 }}>loading... </div>}
      <h1 className={`form-container_text text-color ${TypeScale.headline_medium}`}>Iniciar Sersión</h1>
      <Text variant={TypeScale.label_large} className="custom-text text-color">¿No tienes cuenta? <Link to={'/auth/register'}><span>registrate</span></Link></Text>
      <div className="separator">
        <Text variant={TypeScale.title_small} children="o" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          control={control}
          name="userName"
          labelText="User"
        />
        <TextField
          control={control}
          name="password"
          labelText="Password"
          type="password"
        />
        <input className="button elevation-2" type="submit" value="Iniciar Sesión" />
      </form>
    </article>
  )
}

export default LogInPage;