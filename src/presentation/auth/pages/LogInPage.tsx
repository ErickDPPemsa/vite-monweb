import { SubmitHandler, useForm } from "react-hook-form";
import { Text } from '../../components/Text';
import { Link } from "react-router-dom";
import { TextField } from "../../components/TextField";
import { AuthService } from "../../../services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../stores";
import { useHandleError } from "../../../hooks";
import { Spinner } from "../../icons/icons";

type InputsLogIn = {
  userName: string,
  password: string
}

export const LogInPage = () => {
  const { handleSubmit, control } = useForm<InputsLogIn>({ defaultValues: { userName: '', password: '' } });
  const logIn = useAuthStore(state => state.logIn);
  const { showError } = useHandleError();
  const { mutate, isLoading } = useMutation(['logIn'], AuthService.login, { retry: 0 });

  const onSubmit: SubmitHandler<InputsLogIn> = async (data) =>
    mutate(data, {
      onSuccess: ({ createdAt, updatedAt, token, ...rest }) => logIn(rest, token),
      onError: error => showError({ responseError: error }),
    });
  ;

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
        <button disabled={isLoading} className="button elevation-2" type="submit">
          {isLoading ? <Spinner classname="icon-spin" /> : 'Sign in'}
        </button>
      </form>
    </article>
  )
}