import React from "react";
import CartIcon from './CartIcon/CartIcon';
import styles from './Header.module.css';
import SearchBar from "./SearchBar/SearchBar";
import Navbar from "./Navbar/NavBar";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";




interface HeaderProps {
    logo:string;
    onSearch:(query: string) => void;
}



 
const Header: React.FC<HeaderProps> = ({logo , onSearch }) => {
    const { cartItemsCount } = useCart();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                <img src={logo} alt="E-Commerce Logo" className={styles.logo} />
                </div>

                <Navbar className={styles.navbar} />


                <div className={styles.actions}>
          <SearchBar onSearch={onSearch} />
          <CartIcon itemsCount={cartItemsCount} />
        </div>

            </div>
        </header>
    );
};

export default Header;