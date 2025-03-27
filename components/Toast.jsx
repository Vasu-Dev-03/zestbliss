import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationCircleIcon, 
  InformationCircleIcon, 
  XMarkIcon 
} from '@heroicons/react/24/solid';

const ToastContainer = ({ children }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-4 min-w-[300px]">
      {children}
    </div>
  );
};

export const Toast = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Set up auto-dismiss
  useEffect(() => {
    setMounted(true);
    
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  // Determine icon based on type
  const Icon = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationCircleIcon,
    info: InformationCircleIcon
  }[type] || InformationCircleIcon;
  
  // Determine color based on type
  const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  }[type] || 'bg-blue-50 text-blue-800 border-blue-200';
  
  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  }[type] || 'text-blue-500';
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose && onClose();
    }, 300); // Match animation duration
  };
  
  return (
    <div 
      className={`${colors} flex items-start p-4 rounded-lg shadow-lg border animate-fadeIn transition-all duration-300 transform ${isClosing ? 'opacity-0 translate-x-4' : 'opacity-100'}`}
      role="alert"
    >
      <Icon className={`${iconColors} w-5 h-5 mt-0.5 mr-3 flex-shrink-0`} />
      
      <div className="flex-grow">
        <p className="text-sm font-medium">{message}</p>
      </div>
      
      <button 
        onClick={handleClose}
        className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

const ToastManager = () => {
  const [toasts, setToasts] = useState([]);
  
  // Method to add a new toast
  const addToast = (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { ...toast, id }]);
    
    return id;
  };
  
  // Method to remove a toast
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };
  
  // Expose methods
  React.useImperativeHandle(React.useRef(), () => ({
    success: (message, duration) => 
      addToast({ message, type: 'success', duration }),
    error: (message, duration) => 
      addToast({ message, type: 'error', duration }),
    warning: (message, duration) => 
      addToast({ message, type: 'warning', duration }),
    info: (message, duration) => 
      addToast({ message, type: 'info', duration }),
    remove: removeToast
  }));
  
  // Only render in browser
  if (typeof window === 'undefined') return null;
  
  return createPortal(
    <ToastContainer>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContainer>,
    document.body
  );
};

export default ToastManager; 