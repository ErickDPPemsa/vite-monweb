import { useMutation } from "@tanstack/react-query";
import { UserService } from '../services';

export function useNewUser() {
    return useMutation(['createUser'], UserService.create);
}

export function useUpdateUser() {
    return useMutation(['updateUser'], UserService.update);
}