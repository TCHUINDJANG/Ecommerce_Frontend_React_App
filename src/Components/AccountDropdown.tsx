import React, { useState } from 'react';
import styles from './AccountDropdown.module.css';
import ChevronDown from './icons/chevron-down.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserIcon from './user-icon.svg';


interface AccountDropdownProps {
    user: {
        name: string;
        email: string;
    };
    mobile?: boolean;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ user, mobile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();

    return (
        <div className={`${styles.dropdown} ${mobile ? styles.mobileDropdown : ''}`}>
            <button 
                className={styles.dropdownButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <UserIcon className={styles.userIcon} />
                <span className={styles.userName}>{user.name}</span>
                <ChevronDown className={`${styles.chevron} ${isOpen ? styles.rotate : ''}`} />
            </button>
            
            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <Link to="/account" className={styles.menuItem}>Mon compte</Link>
                    <Link to="/orders" className={styles.menuItem}>Mes commandes</Link>
                    <Link to="/wishlist" className={styles.menuItem}>Ma liste d'envies</Link>
                    <button 
                        onClick={logout} 
                        className={styles.menuItem}
                    >
                        Déconnexion
                    </button>
                </div>
            )}
        </div>
    );
};

export default AccountDropdown;