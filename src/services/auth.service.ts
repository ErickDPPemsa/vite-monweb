import { AxiosError } from 'axios';
import { monwebApi } from '../api/monweb.api';
import { TypeUser } from '../interfaces';

interface LoginResponse {
  id: string;
  fullName: string;
  userName: string;
  role: TypeUser;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface ErrorResponse {
  message: Array<string>;
  error: string;
  statusCode: number;
}

export class AuthService {

  static login = async (props: { userName: string, password: string }): Promise<LoginResponse> => {
    try {
      const { data } = await monwebApi.post<LoginResponse>('/auth', props);
      return data;
    } catch (error) {
      throw new Error(`${((error as AxiosError).response?.data as ErrorResponse).message}`);
    }
  }

  static register = async (props: { userName: string, password: string }): Promise<LoginResponse> => {
    try {
      const { data } = await monwebApi.post<LoginResponse>('/user', props);
      return data;
    } catch (error) {
      throw new Error(`${((error as AxiosError).response?.data as ErrorResponse).message}`);
    }
  }

  static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await monwebApi.get<LoginResponse>('/auth/check');
      return data;
    } catch (error) {
      throw new Error(`${((error as AxiosError).response?.data as ErrorResponse).message}`);
    }
  }

}

