import React from 'react';
import styles from './Footer.module.css';
// import Newsletter from './Newsletter/Newsletter';
import FooterLinks from './FooterLinks';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.about}>
            <h3 className={styles.logo}>E-Shop</h3>
            <p className={styles.description}>
              Your one-stop shop for all your needs. We provide high-quality products with excellent customer service.
            </p>
          </div>
          
          <FooterLinks />
          
          {/* <Newsletter /> */}
        </div>
        
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="/privacy" className={styles.legalLink}>Privacy Policy</a>
            <a href="/terms" className={styles.legalLink}>Terms of Service</a>
            <a href="/cookies" className={styles.legalLink}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;