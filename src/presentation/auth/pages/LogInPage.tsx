import { SubmitHandler, useForm } from "react-hook-form";
import { Text } from '../../components/Text';
import { Link } from "react-router-dom";
import { TextField } from "../../components/TextField";
import { AuthService } from "../../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../../../stores";

type InputsLogIn = {
  userName: string,
  password: string
}

export const LogInPage = () => {
  const { handleSubmit, control } = useForm<InputsLogIn>({ defaultValues: { userName: '', password: '' } });
  const logIn = useAuthStore(state => state.logIn);

  const { mutate } = useMutation([], AuthService.login, {
    retry: 0,
    onError: async err => toast.error(`${err}`),
    onSuccess: ({ createdAt, updatedAt, token, ...rest }) => logIn(rest, token),
  });

  const onSubmit: SubmitHandler<InputsLogIn> = async (data) => {
    mutate(data);
  };

  return (
    <article>
      <h1 className={`form-container_title`}>Sign in</h1>
      <Text className="form-container_text">Don't have an account ? <Link to={'/auth/register'}><strong>Sign up</strong></Link></Text>
      <div className="separator">
        <span children="or" />
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
        <input className="button elevation-2" type="submit" value="Sign in" />
      </form>
    </article>
  )
}