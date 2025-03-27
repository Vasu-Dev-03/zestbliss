import { useRouter } from 'next/router';
import { useCartStore } from '../store/cartStore';
import UPIPayment from '../components/UPIPayment';
import { useState } from 'react';

export default function Checkout() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [upiId, setUpiId] = useState("merchant@upi");
  
  // Generate a unique order ID
  const orderId = `ORD${Date.now()}`;
  
  const handlePaymentComplete = () => {
    // Here you would typically verify the payment with your backend
    clearCart();
    router.push('/order-success');
  };
  
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-8">Your Cart is Empty</h1>
        <p className="mb-4">Add some products to your cart before checking out.</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {items.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{getTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={true}
              readOnly
              className="h-4 w-4 text-blue-600"
            />
            <span>UPI Payment</span>
          </label>
        </div>
      </div>
      
      <UPIPayment
        amount={getTotal()}
        orderId={orderId}
        upiId={upiId}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
} 