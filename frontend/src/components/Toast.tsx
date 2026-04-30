import { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

type ToastType = 'success' | 'error';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const remove = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Stack de toasts — esquina inferior derecha */}
      <div className="fixed bottom-6 right-6 z-[500] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-start gap-3 min-w-[300px] max-w-sm
              rounded-2xl border bg-white px-4 py-4
              shadow-[0_20px_60px_rgba(15,23,42,0.15)]
              animate-[slideUp_0.3s_ease-out]
              ${toast.type === 'error'
                ? 'border-red-100 '
                : 'border-green-100 '}
            `}
          >
            {/* Ícono */}
            {toast.type === 'error' ? (
              <ExclamationCircleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            ) : (
              <CheckCircleIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            )}

            {/* Texto */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold leading-snug ${
                toast.type === 'error' ? 'text-red-700' : 'text-green-700'
              }`}>
                {toast.type === 'error' ? 'Error' : 'Listo'}
              </p>
              <p className="text-sm text-gray-500 mt-0.5 break-words">{toast.message}</p>
            </div>

            {/* Cerrar */}
            <button
              onClick={() => remove(toast.id)}
              className="text-gray-300 hover:text-gray-500 transition-colors shrink-0 mt-0.5"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
