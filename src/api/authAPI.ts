import apiClient from "./axiosConfig";
import { User } from './types';


export interface LoginData {
    username: string;
    password: string;
}


export interface RegisterData {
    username: string;
    email : string;
    password: string;
    first_name : string;
    last_name: string;
}

export const login = async (data: LoginData): Promise<{user:User; token:string}> => {
    try {
        const response = await apiClient.post('/auth/login/' , {
            username:data.username,
            password:data.password
        }, 
           
        );
        return response.data;
    } catch (error) {
        console.error('Login error:' , error);
        throw error;
    }

}

export const register = async (data: RegisterData): Promise<User> => {
    try {
        const response = await apiClient.post('/auth/register/' , data);
        return response.data;
    } catch (error) {
        console.error('Registration error:' , error);
        throw error;
    }
}


export const fetchUserProfile = async (): Promise<User> => {
    try {
        const response = await apiClient.get('/auth/profile/');
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:' , error);
        throw error;
    }
}