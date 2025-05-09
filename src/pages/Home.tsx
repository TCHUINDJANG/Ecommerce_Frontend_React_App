import React, { useEffect, useState } from "react";
import { Product, Category, Promotion } from '../api/types';
import LoadingSpinner from '../Components/common/LoadingSpinner';
import ErrorMessage from '../Components/common/ErrorMessage';
import { fetchProducts } from "../api/productAPI";
import { fetchCategory } from "../api/CategporyApi";
import ProductList from '../Components/Products/ProductList';
import { useNavigate } from 'react-router-dom';
import { PromotionAPI } from "../api/PromotionApi";
import './Home.css';

const Home: React.FC = () => {
    const [productsData, setProductsData] = useState<{
        count: number,
        results: Product[];
    } | null>(null);

    const [promotionsData, setPromotionsData] = useState<{
        count: number,
        results: Promotion[];
    } | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    const [promotedProducts, setPromotedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadAllData = async () => {
            try {
                setLoading(true);
                const [products, promotions, categoriesData] = await Promise.all([
                    fetchProducts(),
                    
                     PromotionAPI.getActivatePromotion(),
                    //  console.log("Les donnees sont:" , PromotionAPI.getActivatePromotion);
                   
                    fetchCategory().then(res => res.results)
                    
                ]);

                setProductsData(products);
                setPromotionsData(promotions || { count: 0, results: [] });
                setCategories(categoriesData);

                // Calcul des produits en promotion avec les données fraîchement reçues
                const promoted = promotions?.results?.flatMap(promo => 
                    promo.products.map(product => ({
                        ...product,
                        promotionInfo: {
                            name: promo.name,
                            discount: parseFloat(promo.discount_value),
                            type: promo.discount_type as 'fixed' | 'percentage'
                        }
                    })) || []);

                setPromotedProducts(promoted);
                
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!productsData) return <div>No products data</div>;

    return (


        
        
        <div className="home-page">
            {/* Hero Banner - Toujours visible */}
            <section className="hero-banner">
                <h1 className="hero-title">Bienvenue sur notre boutique en ligne</h1>
                <button 
                    onClick={() => navigate('/products')}
                    className="cta-button"
                >
                    Voir tous les produits
                </button>
            </section>

            {/* Promotions */}
            <section className="promotions-section">
                <h2 className="section-title">Promotions en cours</h2>
                {promotionsData?.results?.length ? (
                    <div className="promotions-list">
                        {promotionsData.results.map(promo => (
                            <div key={promo.id} className="promo-card">
                                <h3>{promo.name}</h3>
                                <p>{promo.description}</p>
                                <div className="promo-details">
                                    <span>Code: <strong>{promo.code}</strong></span>
                                    <span>Réduction: <strong>
                                        {promo.discount_value}
                                        {promo.discount_type === 'fixed' ? '€' : '%'}
                                    </strong></span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-promotions">
                    <p>🚀 Profitez bientôt de nos promotions !</p>
                    <small>(Aucune promotion active pour le moment)</small>
                </div>
                )}
            </section>

            {/* Produits en promotion */}
            <section className="featured-section">
                <h2 className="section-title">Produits en promotion</h2>
                {promotedProducts.length ? (
                    <ProductList  />
                ) : (
                    <p>Aucun produit en promotion</p>
                )}
            </section>

            {/* Catégories */}
            <section className="categories-section">
                <h2 className="section-title">Nos catégories</h2>
                {categories.length ? (
                    <div className="categories-grid">
                        {categories.map(category => (
                            <div 
                                key={category.id} 
                                className="category-card"
                                onClick={() => navigate(`/categories/${category.id}`)}
                            >
                                <img 
                                    src={category.image} 
                                    alt={category.name}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/placeholder-category.jpg';
                                    }}
                                />
                                <h3>{category.name}</h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aucune catégorie disponible</p>
                )}
            </section>

            {/* Tous les produits */}
            <section className="all-products-section">
                <h2 className="section-title">Nos Produits</h2>
                <ProductList  />
            </section>

            {/* Quick Links */}
            <nav className="quick-links">
                <button onClick={() => navigate('/products')}>
                    <i className="fas fa-boxes"></i> Tous les produits
                </button>
                <button onClick={() => navigate('/cart')}>
                    <i className="fas fa-shopping-cart"></i> Mon panier
                </button>
                <button onClick={() => navigate('/profile')}>
                    <i className="fas fa-user"></i> Mon compte
                </button>
            </nav>
        </div>
    );
};

export default Home;