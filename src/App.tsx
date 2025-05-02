import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/common/Header';
import Footer from './Components/common/Footer';
import './App.css';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './contexts/CartContext';  
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import Register from './pages/Register';
import CategoriesPage from './pages/CategoryPage';


const App: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implémentez la logique de recherche ici
  };

  return (
    <Router>
      <AuthProvider>
      <CartProvider>
        <div className="app">
          <Header 
            logo="/logo.png" 
            onSearch={handleSearch}  
          />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/register/" element={<Register />} />
              <Route path="/categories/" element={<CategoriesPage />} />
              {/* Ajoutez d'autres routes au besoin */}
            </Routes>
          </main>
          
          <Footer />

         
        </div>
      </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;