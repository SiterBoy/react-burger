import React from 'react';
import { Modal } from '../modal/modal';
import ProfileOrderDetailsPage from '../../pages/profile-order-details-page';

const ProfileOrderDetailsModal = () => {
  return (
    <Modal onClose={() => window.history.back()} isOpen={true}>
      <ProfileOrderDetailsPage />
    </Modal>
  );
};

export default ProfileOrderDetailsModal; 