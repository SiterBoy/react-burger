import React from 'react';
import styles from './order-details.module.css';

interface IOrderDetailsProps {
  orderId: number;
}

export const OrderDetails: React.FC<IOrderDetailsProps> = ({ orderId }) => {
  return (
    <div className={styles.wrapper}>
      <p className='text text_type_digits-large mb-8'>{orderId}</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <img src='/images/done.png' alt='Order is done' className='mt-15 mb-15' />
      <p className='text text_type_main-default mb-2'>
        Ваш заказ начали готовить
      </p>
      <p className='text text_type_main-default text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
