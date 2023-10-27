import { toast } from "sonner";
import { ErrorResponse } from "../interfaces";
import { useAuthStore } from "../stores";
import { AxiosError } from "axios";


export function useHandleError() {
    const logOut = useAuthStore(state => state.logOut);

    const showError = ({ responseError, exit }: { responseError: unknown, exit?: boolean }) => {
        const { error, message, statusCode } = (responseError as AxiosError).response?.data as ErrorResponse;
        if (exit && statusCode === 401) logOut();
        toast.error(message, { description: error ?? statusCode === 401 ? 'Expired session' : '' });
    }

    return { showError, logOut }
}