import React from 'react';
import IIngredientData from "../../types/inretfaces/ingridient-data.interface";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredientsListItem = ({ingridient, onClick}:IBurgerIngredientsListItemProps) => {
  const {_id, image, name, price } = ingridient;

  return (
    <li key={_id} className={styles.ingredient} onClick={onClick}>
      <img src={image} alt={name} className={styles.ingredientImage}/>
      <Counter count={1} size="default" extraClass="m-1"/>
      <div className={styles.ingredientPriceBlock}>
        <span className={styles.ingredientPrice}>{price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={styles.ingredientName}>{name}</p>
    </li>
  );
};

interface IBurgerIngredientsListItemProps {
  ingridient: IIngredientData;
  onClick: () => void
};

export default BurgerIngredientsListItem;