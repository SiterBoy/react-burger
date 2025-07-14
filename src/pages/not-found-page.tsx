import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found-page.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Страница не найдена</p>
      <Link to='/' className={styles.link}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
