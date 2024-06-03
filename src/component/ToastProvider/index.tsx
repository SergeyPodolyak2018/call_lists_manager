import React, { createContext, useContext, useEffect, useState } from 'react';
import styles from './ToastAlert.module.scss';

export interface IToast {
  title: string;
  message: string;
  type: number;
}

interface ToastContextProps {
  toasts: IToast[];
  addToast: (title: string, message: string, type: number) => void;
  removeToast: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  useEffect(() => {
    const callback = (e: CustomEvent<{ data: IToast }>): void => {
      addToast(e.detail.data.title, e.detail.data.message, e.detail.data.type);
    };

    document.addEventListener('toastMessage', callback as EventListener);

    return function cleanup() {
      document.removeEventListener('toastMessage', callback as EventListener);
    };
  });

  const addToast = (title: string, message: string, type: number) => {
    setToasts(prevToasts => [...prevToasts, { title, message, type }]);

    const timer = setTimeout(() => {
      removeToast();
    }, 5000);

    return () => clearTimeout(timer);
  };

  const removeToast = (index?: number) => {
    if (typeof index === 'undefined') {
      setToasts(prevToasts => {
        if (prevToasts.length > 0) {
          return prevToasts.slice(1);
        }
        return prevToasts;
      });
    } else {
      setToasts(prevToasts => {
        const newTosts = [...prevToasts];
        newTosts.splice(index, 1);
        return newTosts;
      });
    }
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className={styles.toastContainer}>
        {toasts.map((toast, index) => (
          <div key={index} className={`${styles.toast} ${styles[toast.type >= 400 ? 'error' : 'success']}`}>
            <div className={styles.header}>{toast.title}</div>
            <div className={styles.body}> {toast.message}</div>
            <div className={`${styles.close} fonticon icon-cross`} onClick={() => removeToast(index)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
