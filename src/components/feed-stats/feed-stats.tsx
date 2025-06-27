import React from 'react';
import styles from './feed-stats.module.css';

const FeedStats: React.FC = () => {
  // Тестовые данные
  const readyOrders = ['034535', '034534', '034530', '034527', '034525'];
  const inProgressOrders = ['034538', '034541', '034542'];
  const total = 28752;
  const today = 138;

  return (
    <section className={styles.statsWrapper}>
      <div className={styles.statuses}>
        <div>
          <div className={styles.statusTitle}>Готовы:</div>
          <ul className={styles.readyList}>
            {readyOrders.map(num => (
              <li key={num} className={styles.ready}>{num}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className={styles.statusTitle}>В работе:</div>
          <ul className={styles.inProgressList}>
            {inProgressOrders.map(num => (
              <li key={num} className={styles.inProgress}>{num}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.totalBlock}>
        <div className={styles.totalTitle}>Выполнено за все время:</div>
        <div className={styles.totalValue}>{total.toLocaleString('ru-RU')}</div>
      </div>
      <div className={styles.totalBlock}>
        <div className={styles.totalTitle}>Выполнено за сегодня:</div>
        <div className={styles.totalValue}>{today}</div>
      </div>
    </section>
  );
};

export default FeedStats; 