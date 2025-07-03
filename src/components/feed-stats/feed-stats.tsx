import React from 'react';
import styles from './feed-stats.module.css';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';
import type { Order } from '../../store/slices/order-feed-slice';

function chunkArray<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

const FeedStats: React.FC = () => {
  const { orders, total, totalToday } = useAppSelector((state: RootState) => state.orderFeed);
  const ordersTyped = orders as Order[];

  const readyOrders = ordersTyped.filter((o) => o.status === 'done').map((o) => o.number);
  const inProgressOrders = ordersTyped.filter((o) => o.status === 'pending').map((o) => o.number);

  const readyChunks = chunkArray(readyOrders, 10);
  const inProgressChunks = chunkArray(inProgressOrders, 10);

  return (
    <section className={styles.statsWrapper}>
      <div className={styles.statuses}>
        <div>
          <div className={styles.statusTitle}>Готовы:</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {readyChunks.map((chunk, idx) => (
              <ul className={styles.readyList} key={idx}>
                {chunk.map(num => (
                  <li key={String(num)} className={styles.ready}>{num}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div>
          <div className={styles.statusTitle}>В работе:</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {inProgressChunks.map((chunk, idx) => (
              <ul className={styles.inProgressList} key={idx}>
                {chunk.map(num => (
                  <li key={String(num)} className={styles.inProgress}>{num}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.totalBlock}>
        <div className={styles.totalTitle}>Выполнено за все время:</div>
        <div className={styles.totalValue}>{total.toLocaleString('ru-RU')}</div>
      </div>
      <div className={styles.totalBlock}>
        <div className={styles.totalTitle}>Выполнено за сегодня:</div>
        <div className={styles.totalValue}>{totalToday}</div>
      </div>
    </section>
  );
};

export default FeedStats; 