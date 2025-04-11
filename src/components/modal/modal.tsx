import React, { useEffect, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";

interface IModalProps extends PropsWithChildren {
  onClose: () => void,
  title?: string,
  isOpen: boolean,
}
const modalRoot = document.getElementById('modals')!;

export const Modal = ({ onClose, title, children, isOpen }: IModalProps) => {
  useEffect(() => {
    const handleEsc = (e:any) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if(!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.modal}>
        {title && (
          <div className={styles.header}>
            <h2 className="text text_type_main-large">{title}</h2>
          </div>
        )}
        <div className={styles.close} onClick={onClose}>
          <CloseIcon type="primary" />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};