import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IIngredientData from "../../types/interfaces/ingridient-data.interface";
import styles from './burger-constructor-list-item.module.css';
import { useAppDispatch } from '../../store/hooks';
import { removeIngredient } from '../../store/slices/constructor-slice';

type Ttype = 'top' | 'bottom'

const map: Record<Ttype, string> = {
  top: ' (верх)',
  bottom: ' (низ)'
}

const BurgerConstructorListItem = ({ ingridient, isLocked, type, index, onRemove } : IBurgerConstructorListItemProps) => {
  const dispatch = useAppDispatch();
  const {_id, name, price, image } = ingridient;
  const finalText = type ? name + map[type] : name;

  const handleRemove = () => {
    if (typeof index === 'number') {
      dispatch(removeIngredient(index));
    }
  };

  return (
    <li key={_id} className={styles.burgerConstructorIngridient}>
      <button
        className={styles.burgerConstructorMoveButton}
        aria-label="Open task menu"
        aria-haspopup="true"
      >
        <DragIcon type="primary" className={styles.burgerConstructorDragIcon}/>
      </button>
      <ConstructorElement
        text={finalText}
        price={price}
        thumbnail={image}
        isLocked={isLocked}
        type={type}
        handleClose={onRemove || handleRemove}
      />
      <div className={styles.scrollAreaGap}></div>
    </li>
  );
 };

interface IBurgerConstructorListItemProps {
  ingridient: IIngredientData;
  type?: "top" | "bottom";
  isLocked?: boolean;
  index?: number;
  onRemove?: () => void;
};

export default BurgerConstructorListItem;