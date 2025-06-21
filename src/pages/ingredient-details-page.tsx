import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import IIngredientData from '../types/interfaces/ingridient-data.interface';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';

const IngredientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const ingredient = ingredients.find((item: IIngredientData) => item._id === id);

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetails ingredient={ingredient} />;
};

export default IngredientDetailsPage; 