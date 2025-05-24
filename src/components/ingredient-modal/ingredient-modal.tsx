import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

export const IngredientModal = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector((state: RootState) => state.ingredients.items);
  const ingredient = id ? ingredients.find((item) => item._id === id) : null;

  if (!ingredient) return null;

  return (
    <Modal onClose={() => window.history.back()} isOpen={true}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  );
}; 