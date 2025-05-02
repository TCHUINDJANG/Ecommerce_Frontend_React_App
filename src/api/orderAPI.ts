import apiClient from "./axiosConfig";
import { Order } from './types';



export const createOrder = async(shippingAdress : string , paymentMethod: string) : Promise<Order> => {
    try {
        const response = await apiClient.post('/orders/' , {shipping_Adress: shippingAdress , payement_method :paymentMethod });
        return response.data;
    } catch (error) {
        console.error('Error creating order:' , error);
        throw error;
    }
}

export const fetchOrders = async (): Promise<Order[]> => {
    try {
        const response = await apiClient.get('/orders/');
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:' , error);
        throw error;
    }
};


export const fetchOrderById = async (orderId: number): Promise<Order> => {
    try {
        const response = await apiClient.get('/orders/${orderId}/');
        return response.data;
    } catch (error) {
        console.error('Error fetching order $ {orderId}:' , error);
        throw error;
    }
};