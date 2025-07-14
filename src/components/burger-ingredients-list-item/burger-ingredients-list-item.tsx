import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import IIngredientData from '../../types/interfaces/ingridient-data.interface';
import styles from '../burger-ingredients/burger-ingredients.module.css';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/types';

const BurgerIngredientsListItem: React.FC<IBurgerIngredientsListItemProps> = ({
  ingridient,
  onClick,
  onDrop,
}) => {
  const { _id, image, name, price } = ingridient;
  const count = useAppSelector(
    (state: RootState) => state.ingredients.counters[_id] || 0
  );
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: () => ingridient,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrop();
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    navigate(`/ingredients/${_id}`, { state: { background: location } });
  };

  const opacity = isDragging ? 0.4 : 1;

  // Подключаем drag ref к элементу
  dragRef(ref);

  return (
    <li
      ref={ref}
      key={_id}
      className={styles.ingredient}
      onClick={handleClick}
      style={{ opacity }}
      data-testid='ingredient-card'
    >
      <img src={image} alt={name} className={styles.ingredientImage} />
      {count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
      <div className={styles.ingredientPriceBlock}>
        <span className={styles.ingredientPrice}>{price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <p className={styles.ingredientName}>{name}</p>
    </li>
  );
};

interface IBurgerIngredientsListItemProps {
  ingridient: IIngredientData;
  onClick: () => void;
  onDrop: () => void;
}

export default BurgerIngredientsListItem;
