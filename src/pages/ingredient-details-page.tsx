import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import styles from './ingredient-details-page.module.css';
import IIngredientData from '../types/interfaces/ingridient-data.interface';

const IngredientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector((state: RootState) => state.ingredients.items);
  const ingredient = ingredients.find((item: IIngredientData) => item._id === id);

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Детали ингредиента</h1>
      <div className={styles.content}>
        <img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
        <h2 className={styles.name}>{ingredient.name}</h2>
        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.label}>Калории, ккал</span>
            <span className={styles.value}>{ingredient.calories}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Белки, г</span>
            <span className={styles.value}>{ingredient.proteins}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Жиры, г</span>
            <span className={styles.value}>{ingredient.fat}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Углеводы, г</span>
            <span className={styles.value}>{ingredient.carbohydrates}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetailsPage; 