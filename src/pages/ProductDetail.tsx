import React , {useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { Product } from "../api/types";
import './ProductsDetail.css';
import { fetchProductById } from "../api/productAPI";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from 'react-router-dom';



const ProductDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [product , setProduct] = useState<Product | null>(null);
    const [loading , setLoading] = useState(true);
    const [error , setError] = useState<string | null>(null);
    const { addToCart} = useCart();
    const navigate = useNavigate();



    const handleAddToCart = () => {
        if(!product) return ;
        addToCart(product , 1)
        navigate('/cart')
        
    };
    



    useEffect(() => {
        const loadProduct = async () => {
            try {
                if(!id) return ;
                const productData = await fetchProductById(parseInt(id));
                setProduct(productData);
                console.log("Mes datas sont" , productData)
            } catch (error) {
                setError('Failed to load detail product');
                console.error(error);
            }finally {
                setLoading(false);
            }
        };
        loadProduct();
    } , [id])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;



    return (
        <div className="product-detail-container">
            <div className="product-detail-image">
                <img 
                src={product.image}
                alt={product.name}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-product.png';
                }}
                />
            </div>


            <div className="product-detail-info">
                <h1>{product.name}</h1>
                <p className="category">{product.category.name}</p>
            </div>


            <div className="pricing">
            {product.discount_price && (
            <span className="original-price">${product.price}</span>
          )}
          <span className="current-price">${product.current_price}</span>
            </div>

            <p className="description">{product.description}</p>


            <div className="stock-info">
          {product.available ? (
            <span className="in-stock">In Stock ({product.stock} available)</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>
        <div>
            <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
        </div>
        
    )
}


export default ProductDetails;