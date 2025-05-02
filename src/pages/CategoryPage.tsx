// src/pages/CategoriesPage.tsx
import React, { useEffect, useState } from 'react';
import { fetchCategory } from '../api/CategporyApi';
import CategoryCard from '../Components/Category/CategoryCard';
import './CategoryPage.css'
import LoadingSpinner from '../Components/common/LoadingSpinner';
import ErrorMessage from '../Components/common/ErrorMessage';
import { Category } from '../api/types';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategory({search : searchQuery});
        setCategories(data.results);
      } catch (err) {
        setError('Failed to load categories. Please try again later.');
        console.error('Error loading categories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [searchQuery]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="categories-container">
      <h1 className="categories-title">Our Product Categories</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;