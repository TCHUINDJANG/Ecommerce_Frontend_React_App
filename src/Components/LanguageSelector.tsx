import React, { useState } from 'react';
import styles from './LanguageSelector.module.css';
import { ReactComponent as GlobeIcon } from './icons/globe.svg';
import { ReactComponent as ChevronDown } from './icons/chevron-down.svg';

const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('FR');

    const languages = [
        { code: 'FR', name: 'Français' },
        { code: 'EN', name: 'English' },
        { code: 'ES', name: 'Español' }
    ];

    return (
        <div className={styles.selector}>
            <button 
                className={styles.selectorButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <GlobeIcon className={styles.globeIcon} />
                <span>{selectedLanguage}</span>
                <ChevronDown className={`${styles.chevron} ${isOpen ? styles.rotate : ''}`} />
            </button>
            
            {isOpen && (
                <div className={styles.languageMenu}>
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            className={`${styles.languageOption} ${selectedLanguage === lang.code ? styles.selected : ''}`}
                            onClick={() => {
                                setSelectedLanguage(lang.code);
                                setIsOpen(false);
                            }}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;