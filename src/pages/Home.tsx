import React , {useEffect , useState} from "react";
import { Product } from '../api/types'
import LoadingSpinner from '../Components/common/LoadingSpinner';
import ErrorMessage from '../Components/common/ErrorMessage';
import { fetchProducts } from "../api/productAPI"
import ProductList from '../Components/Products/ProductList';



const Home:React.FC = () => {
    const [productsData , setProductsData] = useState<{
        count:number,
        results:Product[];
    } | null>(null);
    const [loading , setLoading] = useState<boolean>(true);
    const [error , setError] = useState<string | null>(null);
    



    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProductsData(data);
            } catch (error) {
                setError(error instanceof Error ? error.message: 'Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    } , []);


    if(loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;
    if (!productsData) return <div>No products data</div>;


    return (
        <div className="home-page">
            <h1 className="home-title">Nos Produits</h1>
            <ProductList products={productsData.results} />
        </div>
    )
}

export default Home;