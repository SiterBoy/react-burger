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
        {order.ingredients.slice(0, 6).map((ing, idx) => (
          <span key={idx} className={styles.ingredientIcon}>
            <img src={ing.image} alt={ing.name} style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #2f2f37', objectFit: 'cover' }} />
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