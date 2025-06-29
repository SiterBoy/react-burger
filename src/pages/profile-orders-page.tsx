import React from 'react';
import OrderCard from '../components/order-card/order-card';
import styles from './profile-orders-page.module.css';

const testOrders = [
  {
    number: '034535',
    name: 'Death Star Starship Main бургер',
    date: 'Сегодня, 16:20',
    ingredients: ['bun1', 'main1', 'sauce1', 'main2', 'main3', 'main4', 'main5', 'main6'],
    price: 480,
    status: 'done',
  },
  {
    number: '034534',
    name: 'Interstellar бургер',
    date: 'Сегодня, 13:20',
    ingredients: ['main1', 'main2', 'main3', 'main4', 'main5', 'main6'],
    price: 560,
    status: 'pending',
  },
  {
    number: '034533',
    name: 'Black Hole Singularity острый бургер',
    date: 'Вчера, 13:50',
    ingredients: ['bun2', 'main1', 'main2', 'main3', 'main4'],
    price: 510,
    status: 'done',
  },
  {
    number: '034532',
    name: 'Supernova Infinity бургер',
    date: '2 дня назад, 21:53',
    ingredients: ['bun1', 'main1', 'main2', 'main3'],
    price: 370,
    status: 'pending',
  },
];

const ProfileOrdersPage: React.FC = () => {
  return (
    <div className={styles.ordersWrapper}>
      <h1 className={styles.title}>История заказов</h1>
      <div className={styles.orders}>
        {testOrders.map(order => (
          <OrderCard key={order.number} order={order} />
        ))}
      </div>
    </div>
  );
};

export default ProfileOrdersPage; 