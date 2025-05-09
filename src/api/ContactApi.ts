import { ContactResponse , ContactFormData } from "./types";
import apiClient from "./axiosConfig";
import axios from 'axios';



export const createMessage = async(formData: ContactFormData):Promise<ContactResponse> => {
    try {
        const response = await apiClient.post('/api/contact/', formData);
        return response.data

    } catch (error) {
        if(axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erreur lors de l\'envoi du message');
        }
        throw new Error('Une erreur inconnue est survenue');
    }
};  