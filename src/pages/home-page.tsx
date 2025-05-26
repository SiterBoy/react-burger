import React from 'react';
import { useAppSelector } from '../store/hooks';
import styles from './home-page.module.css';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

const HomePage: React.FC = () => {
  const { items, loading, error } = useAppSelector((state) => state.ingredients);

  if (error) {
    console.error('Ошибка загрузки ингредиентов:', error);
    return <div style={{color: 'red', textAlign: 'center', marginTop: 40}}>Ошибка загрузки ингредиентов</div>;
  }

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: 40}}>Загрузка...</div>;
  }

  if (!items || items.length === 0) {
    return <div style={{textAlign: 'center', marginTop: 40}}>Нет ингредиентов для отображения</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.flexBlock}>
        <BurgerIngredients />
      </div>
      <div className={styles.flexBlock}>
        <BurgerConstructor />
      </div>
    </main>
  );
};

export default HomePage; 