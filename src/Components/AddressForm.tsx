import React, { useState } from "react";
import { Address } from "../api/types";
import './AdressForm.css'

// Composant AddressForm
interface AddressFormProps {
  initialValues?: Address;
  onSubmit: (address: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ initialValues, onSubmit }) => {
  const [address, setAddress] = useState<Address>(initialValues || {
    street: '',
    city: '',
    state: '',
    zip_code: '',
    country: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="address-form">
      <h3>Shipping Address</h3>
      <div className="form-group">
        <label>Street</label>
        <input 
          type="text" 
          value={address.street}
          onChange={(e) => setAddress({...address, street: e.target.value})}
          required/>
        
      </div>
      <div className="form-group">
        <label>City</label>
        <input 
          type="text" 
          value={address.city}
          onChange={(e) => setAddress({...address, city: e.target.value})}
          required/>
        
      </div>
      <div className="form-group">
        <label>State/Province</label>
        <input 
          type="text" 
          value={address.state}
          onChange={(e) => setAddress({...address, state: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Zip Code</label>
        <input 
          type="text" 
          value={address.zip_code}
          onChange={(e) => setAddress({...address, zip_code: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Country</label>
        <input 
          type="text" 
          value={address.country}
          onChange={(e) => setAddress({...address, country: e.target.value})}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Continue to Payment</button>
    </form>
  );
};


export default AddressForm
