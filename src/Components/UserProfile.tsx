import React, { useState } from 'react';
import { User } from '../api/types';
import './UserProfile.css';

interface UserProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.adress,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>Informations personnelles</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
        >
          {isEditing ? 'Annuler' : 'Modifier'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Prénom</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group full-width">
              <h3>Adresse</h3>
              <div className="address-grid">
                <div className="form-group">
                  <label>Ville</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.adress?.city || ''}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>Région</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.adress?.state || ''}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>Code postal</label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.adress?.postal_code || ''}
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="form-group">
                  <label>Pays</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.adress?.country || ''}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="save-button">
            Enregistrer les modifications
          </button>
        </form>
      ) : (
        <div className="profile-view">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Prénom</span>
              <span className="info-value">{user.first_name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Nom</span>
              <span className="info-value">{user.last_name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Téléphone</span>
              <span className="info-value">{user.phone || 'Non renseigné'}</span>
            </div>
          </div>
          
          {user.adress && (
            <div className="address-section">
              <h3>Adresse</h3>
              <div className="address-info-grid">
                <div className="info-item">
                  <span className="info-label">Ville</span>
                  <span className="info-value">{user.adress.city}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Région</span>
                  <span className="info-value">{user.adress.state}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Code postal</span>
                  <span className="info-value">{user.adress.postal_code}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Pays</span>
                  <span className="info-value">{user.adress.country}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;