import { monwebApi } from "../api/monweb.api";
import { UsersRespose, propsUserCreate } from "../interfaces";

export class UserService {
    static users = async (limit: number = 5, offset: number = 0): Promise<Array<UsersRespose>> => {
        const { data } = await monwebApi.get<Array<UsersRespose>>(`/user`, { params: { limit, offset } });
        return data;
    }

    static create = async (props: propsUserCreate): Promise<UsersRespose> => {
        const { data } = await monwebApi.post<UsersRespose>('/user', props);
        return data;
    }

    static delete = async (id: string) => {
        const { data } = await monwebApi.delete<boolean>(`/user/${id}`);
        return data;
    }

}