import React from 'react';
import styles from './Navbar.module.css';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const navItems = [
    { id: 1, label: 'Home', path: '/' },
    { id: 2, label: 'Boutiques', path: '/products' },
    { id: 3, label: 'Categories', path: '/categories' },
    { id: 4, label: 'Dashbord', path: '/dashboard' },
    { id: 5, label: 'Checkout', path: '/checkout' },
    { id: 6, label: 'Login', path: '/login' },
    { id: 7, label: 'Register', path: '/register' },
    { id: 8, label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`${styles.navbar} ${className || ''}`}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <a href={item.path} className={styles.navLink}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;