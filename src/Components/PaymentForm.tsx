import { PaymentMethod } from "../api/types";
import React , {useState} from "react";
import './PaymentForm.css';


interface PaymentFormProps {
    onSubmit: (paymentData: PaymentMethod) => void;
    loading: boolean;
  }
  
  const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, loading }) => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
      method_type: 'credit_card',
      details: {
        card_number: '',
        exp_month: '',
        exp_year: '',
        cvc: ''
      }
    });
  
    const handleSubmit = (e: React.FormEvent) => { 
      e.preventDefault();
      onSubmit(paymentMethod);
    };
  
    return (
      <form onSubmit={handleSubmit} className="payment-form">
        <h3>Payment Method</h3>
        <div className="form-group">
          <label>Card Number</label>
          <input 
            type="text"
            placeholder="1234 5678 9012 3456"
            value={paymentMethod.details.card_number}
            onChange={(e) => setPaymentMethod({
              ...paymentMethod,
              details: {
                ...paymentMethod.details,
                card_number: e.target.value
              }
            })}
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Expiration Month</label>
            <input 
              type="text"
              placeholder="MM"
              value={paymentMethod.details.exp_month}
              onChange={(e) => setPaymentMethod({
                ...paymentMethod,
                details: {
                  ...paymentMethod.details,
                  exp_month: e.target.value
                }
              })}
              required
            />
          </div>
          <div className="form-group">
            <label>Expiration Year</label>
            <input 
              type="text"
              placeholder="YY"
              value={paymentMethod.details.exp_year}
              onChange={(e) => setPaymentMethod({
                ...paymentMethod,
                details: {
                  ...paymentMethod.details,
                  exp_year: e.target.value
                }
              })}
              required
            />
          </div>
          <div className="form-group">
            <label>CVC</label>
            <input 
              type="text"
              placeholder="CVC"
              value={paymentMethod.details.cvc}
              onChange={(e) => setPaymentMethod({
                ...paymentMethod,
                details: {
                  ...paymentMethod.details,
                  cvc: e.target.value
                }
              })}
              required
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Processing...' : 'Complete Order'}
        </button>
      </form>
    );
  };


  export default PaymentForm;
  