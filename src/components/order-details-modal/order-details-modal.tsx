import React from 'react';
import { useParams } from 'react-router-dom';
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