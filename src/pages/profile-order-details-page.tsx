import React from 'react';
import styles from './profile-order-details-page.module.css';

const testOrder = {
  number: '034533',
  name: 'Black Hole Singularity острый бургер',
  status: 'Выполнен',
  ingredients: [
    { name: 'Флюоресцентная булка R2-D3', count: 2, price: 20, image: '' },
    { name: 'Филе Люминесцентного тетраодонтиформа', count: 1, price: 300, image: '' },
    { name: 'Соус традиционный галактический', count: 1, price: 30, image: '' },
    { name: 'Плоды фалленианского дерева', count: 1, price: 80, image: '' },
  ],
  date: 'Вчера, 13:50',
  price: 510,
};

const ProfileOrderDetailsPage: React.FC = () => {
  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.number}>#{testOrder.number}</div>
      <h2 className={styles.name}>{testOrder.name}</h2>
      <div className={styles.status}>{testOrder.status}</div>
      <div className={styles.sectionTitle}>Состав:</div>
      <ul className={styles.ingredients}>
        {testOrder.ingredients.map((item, idx) => (
          <li key={idx} className={styles.ingredientRow}>
            <div className={styles.ingredientName}>{item.name}</div>
            <div className={styles.ingredientCount}>{item.count} x {item.price}</div>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <span className={styles.date}>{testOrder.date}</span>
        <span className={styles.price}>{testOrder.price}</span>
      </div>
    </div>
  );
};

export default ProfileOrderDetailsPage; 