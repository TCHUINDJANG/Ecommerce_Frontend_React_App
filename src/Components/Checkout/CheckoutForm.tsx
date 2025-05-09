import React , { useState} from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api/orderAPI";
import './Checkout.css';
import { CartItem } from "../../api/types";
import { Order  } from "../../api/types";
import { PaymentMethod } from "../../api/types";
import { Address } from "../../api/types";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";





interface CheckoutFormProps {
    cartItems: CartItem[];
    onOrderSuccess: (orderId: number) => void;
}



const CheckoutForm: React.FC<CheckoutFormProps> = ({cartItems, onOrderSuccess}) => {
    const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');
    const [orderData, setOrderData] = useState<Partial<Order>>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleAdressSubmit = (addressData: Address) => {
        setOrderData(prev => ({
            ...prev,
            shipping_address: addressData,
            billing_address: addressData
        }));
        setStep('payment');
    };

    const handlePaymentSubmit = async (paymentData: PaymentMethod) => {
        setLoading(true);
        
        // Vérification que shipping_address existe
        if (!orderData.shipping_address) {
          console.error('Shipping address is required');
          setLoading(false);
          return;
        }
      
        try {
          const order = await createOrder({
            shipping_address: orderData.shipping_address,
            payment_method: paymentData,
            items: cartItems.map(item => ({
              product_id: item.product.id,
              quantity: item.quantity,
              price: Number(item.product.price)
            }))
          });
          
          onOrderSuccess(order.id);
          navigate(`/orders/${order.id}`);
        } catch (error) {
          console.error('Order failed', error);
        } finally {
          setLoading(false);
        }
      }


return (
    <div className="checkout-container">
      <div className="checkout-steps">
        <div className={`step ${step === 'address' ? 'active' : ''}`}>1. Address</div>
        <div className={`step ${step === 'payment' ? 'active' : ''}`}>2. Payment</div>
        <div className={`step ${step === 'review' ? 'active' : ''}`}>3. Review</div>
      </div>

      {step === 'address' && (
        <AddressForm 
          initialValues={orderData.shipping_address} 
          onSubmit={handleAdressSubmit} 
        />
      )}

      {step === 'payment' && (
        <PaymentForm 
          onSubmit={handlePaymentSubmit} 
          loading={loading}
        />
      )}
    </div>
  );
};

export default CheckoutForm;


