import React from 'react';
import { Modal } from '../modal/modal';
import OrderDetailsPage from '../../pages/order-details-page';

const OrderDetailsModal = () => {
  return (
    <Modal onClose={() => window.history.back()} isOpen={true}>
      <OrderDetailsPage />
    </Modal>
  );
};

export default OrderDetailsModal; 