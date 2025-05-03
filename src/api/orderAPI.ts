import apiClient from "./axiosConfig";
import { Order } from './types';
import { OrdersResponse } from "./types";



export const createOrder = async(shippingAdress : string , paymentMethod: string) : Promise<Order> => {
    try {
        const response = await apiClient.post('/orders/' , {shipping_Adress: shippingAdress , payement_method :paymentMethod });
        return response.data;
    } catch (error) {
        console.error('Error creating order:' , error);
        throw error;
    }
}

export const getOrders = async (): Promise<Order[]> => {
    try {
        const token = localStorage.getItem('access_token');
        if(!token){
            throw new Error('Authentication token not found');
        }
        const response = await apiClient.get< {
            count:number;
            next:string | null;
            previous: string | null;
            results: Order[]; 
        }>('/orders/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        });
// Transforme les données pour les adapter à votre frontend
        return response.data.results.map(order => ({
            ...order,
// Garantit que items est toujours un tableau
            items:order.items || [],
            // Crée un order_number si absent
            order_number: order.id.toString().padStart(5, '0'),
// Convertit le total en number si c'est une string
            total:typeof order.total === 'string' ? parseFloat(order.total) : order.total
        }))
        
    } catch (error) {
        console.error('Error fetching orders:' , error);
        throw error;
    }
};






export const getOrdersResponse = async (): Promise<OrdersResponse> => {
    try {
        const token = localStorage.getItem('access_token');
        if(!token) {
            throw new Error('Authentication token not found');
        }
        const response = await apiClient.get<OrdersResponse>('/orders/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        return {
            ...response.data,
            results: response.data.results.map(order => ({
                ...order,
                items: order.items || [],
                order_number: order.id.toString().padStart(5, '0'),
                total: typeof order.total === 'string' ? parseFloat(order.total) : order.total
            }))
        };
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};






export const fetchOrderById = async (orderId: number): Promise<Order> => {
    try {
        const response = await apiClient.get(`/orders/${orderId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order $ {orderId}:' , error);
        throw error;
    }
};