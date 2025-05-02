import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';
import { Category } from '../../api/types';
import Cart from '../../pages/Cart';



interface CategoryCardProps {
    category: Category
}


const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {


  const getImageUrl = () => {
    if(!category.image) return '' ;

    if(category.image.startsWith('http')) return category.image;


    if(category.image.startsWith('/media')){
      return `http://localhost:8000${category.image}`;
    }

    return `http://localhost:8000/media/${category.image}`;
  };

    return (
      <Link to={`/categories/${category.slug}`} className="category-card">
        <div className="category-image-container">
          {category.image ? (
            <img 
              src={getImageUrl()} 
              alt={category.name} 
              className="category-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-category.jpg';
                target.onerror = null; // Évite les boucles infinies si le placeholder échoue aussi
              }}

              loading="lazy"   // Optimisation du chargement
            />
          ) : (
            <div className="category-image-placeholder">
              <span>{category.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="category-info">
          <h3 className="category-name">{category.name}</h3>
          {category.description && (
            <p className="category-description">
              {category.description.substring(0, 100)}...
            </p>
          )}
        </div>
      </Link>
    );
  };
  
  export default CategoryCard;
 