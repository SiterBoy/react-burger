import IIngredientData from "../../types/interfaces/ingridient-data.interface";
import styles from './ingredient-details.module.css';
import React from "react";

interface IIngredientDetailsIngredientDetailsProps{
ingredient: IIngredientData
}

export const IngredientDetails: React.FC<IIngredientDetailsIngredientDetailsProps> = ({ ingredient }) => {
  if (!ingredient) return null;

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-large">Детали ингридиента</h2>
      <img src={ingredient.image_large} alt={ingredient.name} className="mb-4"/>
      <h3 className="text text_type_main-medium mb-8">{ingredient.name}</h3>
      <ul className={styles.nutrition}>
        <li className={styles.nutritionItem}>
          <p className={`${styles.nutritionLabel} text text_type_main-default text_color_inactive`}>Калории, ккал</p>
          <p className={`${styles.nutritionValue} text text_type_main-default text_color_inactive`}>{ingredient.calories}</p>
        </li>
        <li className={styles.nutritionItem}>
          <p className={`${styles.nutritionLabel} text text_type_main-small text_color_inactive`}>Белки, г</p>
          <p className={`${styles.nutritionValue} text text_type_main-default text_color_inactive`}>{ingredient.proteins}</p>
        </li>
        <li className={styles.nutritionItem}>
          <p className={`${styles.nutritionLabel} text text_type_main-small text_color_inactive`}>Жиры, г</p>
          <p className={`${styles.nutritionValue} text text_type_main-default text_color_inactive`}>{ingredient.fat}</p>
        </li>
        <li className={styles.nutritionItem}>
          <p className={`${styles.nutritionLabel} text text_type_main-small text_color_inactive`}>Углеводы, г</p>
          <p className={`${styles.nutritionValue} text text_type_main-default text_color_inactive`}>{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};