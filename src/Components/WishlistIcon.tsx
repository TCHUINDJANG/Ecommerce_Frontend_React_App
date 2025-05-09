import React from 'react';
import styles from './WishlistIcon.module.css';
import { ReactComponent as HeartIcon } from './icons/heart.svg';
import { Link } from 'react-router-dom';
import { useWishlist } from './WishlistContext';

const WishlistIcon = () => {
    const { wishlistCount } = useWishlist();

    return (
        <Link to="/wishlist" className={styles.wishlistLink}>
            <HeartIcon className={styles.heartIcon} />
            {wishlistCount > 0 && (
                <span className={styles.wishlistBadge}>{wishlistCount}</span>
            )}
        </Link>
    );
};

export default WishlistIcon;