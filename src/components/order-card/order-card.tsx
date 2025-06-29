import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './order-card.module.css';

interface OrderCardProps {
  order: {
    number: string;
    name: string;
    date: string;
    ingredients: string[];
    price: number;
    status: string;
  };
}

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

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.header}>
        <span className={styles.number}>#{order.number}</span>
        <span className={styles.date}>{order.date}</span>
      </div>
      <div className={styles.name}>{order.name}</div>
      <div className={styles.ingredientsRow}>
        {/* Здесь будут иконки ингредиентов */}
        {order.ingredients.slice(0, 6).map((ing, idx) => (
          <span key={idx} className={styles.ingredientIcon}>{ing}</span>
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