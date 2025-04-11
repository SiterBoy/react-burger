import IIngredientData from "../../types/inretfaces/ingridient-data.interface";
import styles from './ingredient-details.module.css';

interface IIngredientDetailsIngredientDetailsProps{
ingredient: IIngredientData
}

export const IngredientDetails = ({ ingredient }:IIngredientDetailsIngredientDetailsProps) => {
  if (!ingredient) return null;

  return (
    <div className={styles.content}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h3 className="text text_type_main-medium">{ingredient.name}</h3>
      <ul className={styles.nutrition}>
        <li>Калории: {ingredient.calories}</li>
        <li>Белки: {ingredient.proteins}</li>
        <li>Жиры: {ingredient.fat}</li>
        <li>Углеводы: {ingredient.carbohydrates}</li>
      </ul>
    </div>
  );
};