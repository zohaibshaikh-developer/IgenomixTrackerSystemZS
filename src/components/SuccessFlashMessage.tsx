// FlashMessage.tsx
import React, { useEffect } from 'react';

interface FlashMessageProps {
  message: string;
  onClose: () => void;
}

const SuccessFlashMessage: React.FC<FlashMessageProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-close the message after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center' }}>{message}</div>;
};

export default SuccessFlashMessage;
