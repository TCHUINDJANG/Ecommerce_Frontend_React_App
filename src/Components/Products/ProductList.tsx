import React, { useEffect , useState } from 'react';
import { Product } from '../../api/types';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../api/productAPI';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProductListProps {
  initialProducts?: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ initialProducts = [] }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>(initialProducts);;
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  

  
  

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };



  // const handleProductListClick = () => {
  //   navigate('/products'); // Redirection vers la liste des produits
  // }


  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products= await fetchProducts({search : searchQuery})
        setProducts(products.results)
        console.log("Mes donnnees envoyees sont" , products)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  } , [searchQuery]);




  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="productList-container">
      {products.map((product) => (
        <div key={product.id} className="productList-image" 
        onClick={() => handleProductClick(product.id)}
              style={{ cursor: 'pointer' }}
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-images-name"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-product.png';
            }}
          />
          <h3 className="productList-name">{product.name}</h3>
          <p className="productList-category">{product.category.name}</p>
          <div className="mt-2">
            {product.discount_price && (
              <span className="productList-price">
                ${product.price}
              </span>
            )}
            <span className="font-bold text-lg">
              {/* ${product.current_price} */}
            </span>
          </div>
          <p className="productList-description">{product.description}</p>
          <div className="mt-2 text-sm">
            {product.available ? (
              <span className="productList-stock">In Stock ({product.stock})</span>
            ) : (
              <span className="productList-out-stock">Out of Stock</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;