import apiClient from "./axiosConfig";
import { CartItem } from "./types";
import { CartResponse } from "./types";




export const fetchCart = async (): Promise<CartResponse> => {
    try {
        const token = localStorage.getItem('access_token');
        if(!token) throw new Error('No token found');
        const response = await apiClient.get('/cart/' , {
            headers: {
                'Authorization': `Bearer ${token}`
              }
            } );
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:' ,error );
        throw error;
    }
}

export const addCart = async (productId:number , quantity:number = 1) : Promise<CartItem> => {
    try {
        const response = await apiClient.post('cart/add/' , {product_id: productId ,quantity });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:' , error);
        throw error;
    }
}

export const updateCartItem = async(itemId:number, quantity:number): Promise<CartItem> => {
    try {
        const response = await apiClient.put(`/cart/items/${itemId}/` , {quantity });
        return response.data;
    } catch (error) {
        console.error('Error updating cart item:' , error);
        throw error;
    }
};


export const removeFormCart = async (itemId:number): Promise<void> => {
    try {
        await apiClient.delete(`/cart/items/${itemId}/`);
    } catch (error) {
        console.error('Error removing from cart:' , error);
        throw error;
    }
};