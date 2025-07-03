import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import type { Order } from '../store/slices/order-feed-slice';
import type IIngredientData from '../types/interfaces/ingridient-data.interface';
import styles from './order-details-page.module.css';

interface OrderIngredient extends IIngredientData {
  count: number;
}

const OrderDetailsPage: React.FC = () => {
  const { number } = useParams<{ number: string }>();
  const location = useLocation();
  const isProfile = location.pathname.startsWith('/profile/orders');
  const orders = useAppSelector(state =>
    isProfile ? state.profileOrders?.orders || [] : state.orderFeed?.orders || []
  );
  const ingredients = useAppSelector(state => state.ingredients.items);

  const order = orders.find((o: Order) => String(o.number) === number);

  if (!order) {
    return <div className={styles.detailsWrapper}>Заказ не найден</div>;
  }

  const ingredientMap = order.ingredients.reduce((acc: Record<string, number>, id: string) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});
  const orderIngredients: OrderIngredient[] = Object.entries(ingredientMap).map(([id, count]) => {
    const ingredient = ingredients.find(i => i._id === id);
    return ingredient ? { ...ingredient, count } : null;
  }).filter((item): item is OrderIngredient => item !== null);

  const totalPrice = orderIngredients.reduce((sum, ing) => sum + (ing.price * ing.count), 0);

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.number}>#{order.number}</div>
      <h2 className={styles.name}>{order.name}</h2>
      <div className={styles.status}>{order.status}</div>
      <div className={styles.sectionTitle}>Состав:</div>
      <ul className={styles.ingredients}>
        {orderIngredients.map((item, idx) => (
          <li key={idx} className={styles.ingredientRow}>
            <div className={styles.ingredientName}>{item.name}</div>
            <div className={styles.ingredientCount}>{item.count} x {item.price}</div>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <span className={styles.date}>{new Date(order.createdAt).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'long' })}</span>
        <span className={styles.price}>{totalPrice}</span>
      </div>
    </div>
  );
};

export default OrderDetailsPage; 