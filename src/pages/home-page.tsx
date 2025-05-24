import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './home-page.module.css';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { RootState } from '../store';
import { fetchIngredients } from '../store/slices/ingredients-slice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.ingredients);
  useEffect(() => {
    dispatch(fetchIngredients() as any);
  }, [dispatch]);

  if (error) {
    console.error('Ошибка загрузки ингредиентов:', error);
    return <div style={{color: 'red', textAlign: 'center', marginTop: 40}}>Ошибка загрузки ингредиентов</div>;
  }

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: 40}}>Загрузка...</div>;
  }

  if (!items || items.length === 0) {
    console.warn('Ингредиенты не загружены или пусты');
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