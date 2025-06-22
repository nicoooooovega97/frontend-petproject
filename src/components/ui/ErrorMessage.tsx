// src/components/ui/ErrorMessage.tsx
'use client';

interface ErrorMessageProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ title, message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm mt-1">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}