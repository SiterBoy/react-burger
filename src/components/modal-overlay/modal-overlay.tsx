import React from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
  onClick: () => void
};

const ModalOverlay = ({onClick}:IModalOverlayProps) => {
  return <div className={styles.overlay} onClick={onClick} />;
};

export default ModalOverlay;