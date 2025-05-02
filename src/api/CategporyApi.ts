import apiClient from "./axiosConfig";
import { Category } from "./types";





export const fetchCategory = async(params?: {
  search?: string;
}): Promise<{
  count : number;
  next : string |null;
  previous: string | null;
  results : Category[];
}> => {
  try {
    const response = await apiClient.get('/categories/', { params })
    return response.data
  } catch (error) {
    console.error('Error fetching Categories:', error);
        throw error;
  }
}
