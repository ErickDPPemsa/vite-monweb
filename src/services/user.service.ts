import { monwebApi } from "../api/monweb.api";
import { UsersRespose } from "../interfaces";

export class UserService {
    static users = async (limit: number = 5, offset: number = 0): Promise<Array<UsersRespose>> => {
        const { data } = await monwebApi.get<Array<UsersRespose>>(`/user?limit=${limit}&offset=${offset}`);
        return data;
    }

    static create = async (props: { fullName: string; userName: string; password: string; }): Promise<UsersRespose> => {
        const { data } = await monwebApi.post<UsersRespose>('/user', props);
        return data;
    }

}