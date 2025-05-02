import React from 'react';
import { Product } from '../../api/types';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';

interface ProductListProps {
  products: Product[];
}




const ProductList: React.FC<ProductListProps> = ({ products }) => {

  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

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