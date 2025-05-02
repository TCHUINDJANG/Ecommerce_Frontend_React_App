import apiClient from "./axiosConfig";
import { Product } from './types';



export const fetchProducts = async (params?: {
    category?: string;
    search?: string;
    page?: number;
}): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Product[];
}> => {
    try {
        const response = await apiClient.get('/products/', { params });
        return response.data; // Retourne toute la réponse paginée
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};



export const createProduct = async (productData: Omit<Product , 'id' | 'created_at' | 'updated_at'>):Promise<Product> => {
    try {
        const response = await apiClient.post('/products/' , productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product' , error)
        throw error;
    }
};


export const fetchProductById = async (id:number):Promise<Product> => {
    try {
        const response = await apiClient.get(`/products/${id}/`);
        return response.data;   
    } catch (error) {
        console.error('Error fetching product ${id}:' , error);
        throw error;
    }
};