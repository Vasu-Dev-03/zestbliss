import { useState, useCallback } from 'react';

// Toast notification types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  // Add toast
  const addToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 3000) => {
    const id = Date.now().toString();
    
    setToasts(prev => [
      ...prev,
      {
        id,
        message,
        type,
        duration
      }
    ]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, []);

  // Remove toast by id
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Shorthand methods
  const success = useCallback((message, duration) => 
    addToast(message, TOAST_TYPES.SUCCESS, duration), [addToast]);
  
  const error = useCallback((message, duration) => 
    addToast(message, TOAST_TYPES.ERROR, duration), [addToast]);
  
  const warning = useCallback((message, duration) => 
    addToast(message, TOAST_TYPES.WARNING, duration), [addToast]);
  
  const info = useCallback((message, duration) => 
    addToast(message, TOAST_TYPES.INFO, duration), [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
};

export default useToast; 