import React, { useContext } from 'react';
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
import UserDashboard from './pages/UserDashbord';
import ProductList from './Components/Products/ProductList';
import CheckoutForm from './Components/Checkout/CheckoutForm';
import Cart from './pages/Cart';
import UserProfile from './Components/UserProfile';








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
              <Route path="/dashboard" element={<UserDashboard />}/>
              <Route path="/products" element={<ProductList />}/>
              <Route path="/checkout" element={<CheckoutForm cartItems={[]} onOrderSuccess={() => {}}/>}/>
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<UserProfile user={[]} onUpdate={() => {}}  />} />
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