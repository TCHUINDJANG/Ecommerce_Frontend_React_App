import React from "react";
import { Product } from '../../api/types';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { addCart } from "../../api/cartAPI";


interface ProductCardProps {
    product: Product;
}


const ProductCard:React.FC<ProductCardProps> = ({product}) => {
    const { refreshCart } = useCart();



    const handleAddCart = async () => {
        try {
            await addCart(product.id);
            refreshCart();
        } catch (error) {
            console.error('Error adding to cart:' , error);
        }
    };

    return (
        <div className="card-container">
            <Link to={'/products/${product.id}' }>
            <img
            src={product.image || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover" />
            </Link>


            <div className="p-4">
                <Link to={'/products/${product.id}'} className="hover:underline">
                <h3>{product.name}</h3></Link>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <button
                onClick={handleAddCart}>Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;


    