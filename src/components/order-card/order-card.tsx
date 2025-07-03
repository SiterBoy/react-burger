import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './order-card.module.css';
import type IIngredientData from '../../types/interfaces/ingridient-data.interface';

interface OrderCardProps {
  order: {
    number: string | number;
    name: string;
    date: string;
    ingredients: IIngredientData[];
    price: number;
    status: string;
  };
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'done':
      return { text: 'Выполнен', color: '#00FF00' };
    case 'pending':
      return { text: 'Готовится', color: '#FFD600' };
    case 'created':
      return { text: 'Создан', color: '#8585ad' };
    case 'canceled':
      return { text: 'Отменён', color: '#FF1744' };
    default:
      return { text: status, color: '#8585ad' };
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'done':
      return styles.statusDone;
    case 'pending':
      return styles.statusPending;
    case 'created':
      return styles.statusCreated;
    case 'canceled':
      return styles.statusCanceled;
    default:
      return styles.statusDefault;
  }
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname.startsWith('/profile/orders')) {
      navigate(`/profile/orders/${order.number}`, { state: { background: location } });
    } else {
      navigate(`/feed/${order.number}`, { state: { background: location } });
    }
  };

  const status = getStatusText(order.status);
  const statusClass = getStatusClass(order.status);

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.header}>
        <span className={styles.number}>#{order.number}</span>
        <span className={styles.date}>{order.date}</span>
      </div>
      <div className={styles.name}>{order.name}</div>
      {order.status && (
        <div className={statusClass}>{status.text}</div>
      )}
      <div className={styles.ingredientsRow}>
        {order.ingredients.slice(0, 6).map((ing, idx) => (
          <span key={idx} className={styles.ingredientIcon}>
            <img src={ing.image} alt={ing.name} className={styles.ingredientImg} />
          </span>
        ))}
        {order.ingredients.length > 6 && (
          <span className={styles.more}>+{order.ingredients.length - 6}</span>
        )}
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>{order.price}</span>
        <span className={styles.currency}>🪙</span>
      </div>
    </div>
  );
};

export default OrderCard; 