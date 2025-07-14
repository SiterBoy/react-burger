import React, { useEffect, PropsWithChildren } from 'react';
import styles from './modal.module.css';

interface IModalProps extends PropsWithChildren {
  onClose: () => void;
  title?: string;
  isOpen: boolean;
}

export const Modal: React.FC<IModalProps> = ({ onClose, children, isOpen }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button
          className={styles.close}
          onClick={onClose}
          data-testid='modal-close'
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

