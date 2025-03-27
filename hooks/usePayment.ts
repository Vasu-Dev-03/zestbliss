import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useRouter } from 'next/router';

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();

  const processUpiPayment = async (upiId: string, orderId: string) => {
    try {
      setLoading(true);
      setError(null);

      // In a real app, you would call your backend to create a payment record
      // This is a simplified simulation
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulated API delay
      
      // Mock successful payment
      console.log(`Processing UPI payment to ${upiId} for order ${orderId} with amount ${getTotal()}`);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    clearCart();
    router.push('/order-success');
  };

  const handlePaymentFailure = () => {
    setError('Payment was not completed. Please try again.');
  };

  return {
    loading,
    error,
    processUpiPayment,
    handlePaymentSuccess,
    handlePaymentFailure
  };
} 