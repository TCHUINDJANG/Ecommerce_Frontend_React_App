import apiClient from "./axiosConfig";
import { DashbordStats } from './types'




export const fetchStatsApi = async (): Promise<DashbordStats> => {
    try {
        const response = await apiClient.get('/auth/stats/');
        return response.data;
    } catch (error) {
        console.error('Error fetching stats:' , error);
        throw error;
    }
}