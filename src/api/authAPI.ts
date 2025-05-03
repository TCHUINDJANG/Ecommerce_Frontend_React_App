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

export const login = async (username: string, password: string) => {
    try {
        const response = await apiClient.post('/auth/login/' , {
            username, password } , {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
           
        return response;
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
        const token = localStorage.getItem('access_token');
        if(!token) throw new Error('No token found');
        const response = await apiClient.get('/profile/' , {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:' , error);
        throw error;
    }
}



export const updateProfile = async (profileData: Partial<User>): Promise<User> => {
    try {
        const response = await apiClient.put('/profile/update/' , profileData);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:' , error);
        throw error;
    }
}



export const logout = async (): Promise<void> => {
    try {
        
        await apiClient.post('auth/logout/');
    } catch (error) {
        console.error('Logout error' , error);
        throw error;
    }
}






// {
//     "first_name":"test123",
//     "password":"123412",
//     "last_name":"Davidos1",
//     "email":"tankeudavidos@gmail.com",
//     "username":"Paul123"
    
//   }



// {
//     "product":  1,
//     "is_approved": "True",
//     "country": "Afrique",
//     "postal_code": "BP1234",
//     "comment": "Ce produit est vraiment utile et m'a beaucoup aide",
//     "rating": 5
  
  
//   }

