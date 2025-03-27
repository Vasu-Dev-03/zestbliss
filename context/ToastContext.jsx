import React, { createContext, useContext } from 'react';
import useToast from '../hooks/useToast';
import { Toast } from '../components/Toast';

// Create context
const ToastContext = createContext(null);

// Toast provider component
export const ToastProvider = ({ children }) => {
  const toast = useToast();
  
  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Render toasts */}
      {toast.toasts.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-4">
          {toast.toasts.map((t) => (
            <Toast
              key={t.id}
              message={t.message}
              type={t.type}
              duration={t.duration}
              onClose={() => toast.removeToast(t.id)}
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider; 