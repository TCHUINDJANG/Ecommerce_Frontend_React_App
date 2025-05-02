import React from 'react';
import styles from './FooterLinks.module.css';

const FooterLinks: React.FC = () => {
  const linkGroups = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', url: '/products' },
        { label: 'Featured', url: '/featured' },
        { label: 'New Arrivals', url: '/new' },
        { label: 'Sale', url: '/sale' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'Contact Us', url: '/contact' },
        { label: 'FAQs', url: '/faqs' },
        { label: 'Shipping', url: '/shipping' },
        { label: 'Returns', url: '/returns' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Blog', url: '/blog' },
        { label: 'Careers', url: '/careers' },
        { label: 'Press', url: '/press' },
      ],
    },
  ];

  return (
    <div className={styles.linkGroups}>
      {linkGroups.map((group, index) => (
        <div key={index} className={styles.linkGroup}>
          <h4 className={styles.groupTitle}>{group.title}</h4>
          <ul className={styles.links}>
            {group.links.map((link, linkIndex) => (
              <li key={linkIndex} className={styles.linkItem}>
                <a href={link.url} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;