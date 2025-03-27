import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useToastContext } from '../context/ToastContext';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface UPIPaymentProps {
  amount: number;
  orderId: string;
  upiId: string;
  onPaymentComplete: () => void;
}

const UPIPayment = ({ amount, orderId, upiId, onPaymentComplete }: UPIPaymentProps) => {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');
  const [qrError, setQrError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toast = useToastContext();
  
  // Animation on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Generate UPI payment link
  const upiLink = `upi://pay?pa=${upiId}&pn=ZestBliss&am=${amount}&tn=Order%20${orderId}`;
  
  // Generate QR code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiLink)}&size=200x200`;
  
  const handlePaymentComplete = () => {
    setPaymentStatus('processing');
    
    // Simulate payment verification
    setTimeout(() => {
      setPaymentStatus('completed');
      toast.success('Payment completed successfully!');
      onPaymentComplete();
    }, 1500);
  };
  
  return (
    <div 
      className={`flex flex-col items-center p-6 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Pay via UPI</h2>
      
      <div className="mb-6 w-full max-w-md">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg mb-4">
          <span className="text-lg font-medium text-blue-800">Amount:</span>
          <span className="text-xl font-bold text-blue-900">₹{amount.toFixed(2)}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex flex-col">
            <span className="font-medium">Order ID:</span>
            <span className="font-mono bg-gray-100 p-1 rounded mt-1">{orderId}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">UPI ID:</span>
            <span className="font-mono bg-gray-100 p-1 rounded mt-1">{upiId}</span>
          </div>
        </div>
      </div>
      
      {/* QR Code with animated border */}
      <div className={`mb-6 p-1 border-2 border-dashed rounded-lg relative ${paymentStatus === 'completed' ? 'border-green-500' : 'border-blue-500 animate-pulse'}`}>
        <div className="p-3 bg-white rounded-lg">
          {!qrError ? (
            <div className="relative">
              <Image
                src={qrCodeUrl}
                alt="UPI QR Code"
                width={200}
                height={200}
                className={paymentStatus === 'completed' ? 'opacity-30' : 'opacity-100 transition-opacity'}
                onError={() => setQrError(true)}
              />
              
              {paymentStatus === 'completed' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-green-100 rounded-full p-3 animate-fadeIn">
                    <CheckCircleIcon className="w-12 h-12 text-green-600" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-100">
              <p className="text-gray-500 text-center">QR Code unavailable</p>
            </div>
          )}
        </div>
      </div>
      
      {paymentStatus === 'pending' && (
        <div className="space-y-4 w-full max-w-md">
          <a
            href={upiLink}
            className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pay with UPI App
          </a>
          
          <button
            onClick={handlePaymentComplete}
            className="block w-full px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium text-gray-700"
          >
            I've completed the payment
          </button>
          
          <p className="mt-4 text-sm text-gray-600 text-center">
            Scan the QR code or click the button to pay with your preferred UPI app
          </p>
        </div>
      )}
      
      {paymentStatus === 'processing' && (
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-blue-800 font-medium">Verifying payment...</p>
          </div>
        </div>
      )}
      
      {paymentStatus === 'completed' && (
        <div className="w-full max-w-md">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3 animate-fadeIn">
            <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">Payment Successful!</p>
              <p className="text-green-700 text-sm">Your order is being processed.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UPIPayment; 