import React from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IIngredientData from "../../types/inretfaces/ingridient-data.interface";
import styles from './burger-constructor-list-item.module.css';

type Ttype = 'top' | 'bottom'

const map: Record<Ttype, string> = {
  top: ' (верх)',
  bottom: ' (низ)'
}

 const BurgerConstructorListItem = ({ ingridient, isLocked, type} : IBurgerConstructorListItemProps) => {
  const {_id, name, price, image } = ingridient;
  const finalText = type ? name + map[type] : name;

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
      />
    </li>
  );
};

interface IBurgerConstructorListItemProps {
  ingridient: IIngredientData;
  type?: "top" | "bottom";
  isLocked? : boolean;
};

export default BurgerConstructorListItem;