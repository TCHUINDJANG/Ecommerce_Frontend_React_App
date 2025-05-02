import apiClient from "./axiosConfig";
import { Product, Promotion } from "./types";





export const PromotionAPI = {

    async getActivatePromotion(): Promise<{count:number , results:Promotion[]}> {
        try {
            const response = await apiClient.get('/promotions/', {
                params: {
                    active: true,
                    // Vous pouvez ajouter d'autres paramètres de filtrage ici
                }
            });

            return response.data
        } catch (error) {
            console.error('Error fetching active promotions:', error);
            throw new Error(error instanceof Error ? error.message : 'Failed to fetch promotions');
        }
    },

    /**
     * Récupère une promotion spécifique par son ID
     */

    async getPromotionById(id:number) :Promise<Promotion> {
        try {
            const response = await apiClient.get(`/promotions/${id}/`);
            return response.data
        } catch (error) {
            console.error(`Error fetching promotion with ID ${id}:`, error);
            throw new Error(error instanceof Error ? error.message : 'Failed to fetch promotion'); 
        }
    },


    /**
     * Récupère les produits associés à une promotion
     */


    async getProductsForPromotion(promotionId: number):Promise<Product[]> {
        try {
            const response = await apiClient.get(`/promotions/${promotionId}/products/`);
            return response.data
        } catch (error) {
            console.error(`Error fetching products for promotion ${promotionId}:`, error);
            throw new Error(error instanceof Error ? error.message : 'Failed to fetch promotion products');
        }
    },


    /**
     * Vérifie si un code promotionnel est valide
     */
    async validatePromoCode(code: string): Promise<{ valid: boolean; promotion?: Promotion }> {
        try {
            const response = await apiClient.get('/promotions/validate/', {
                params: { code }
            });
            return response.data;
        } catch (error) {
            console.error('Error validating promo code:', error);
            throw new Error(error instanceof Error ? error.message : 'Failed to validate promo code');
        }
    }
}