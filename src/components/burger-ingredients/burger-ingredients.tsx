import React from 'react';
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export interface IngredientData {
  _id: string;
  name: string;
  type: 'bun' | 'sauce' | 'main';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface BurgerIngredientsProps {
  ingredients: IngredientData[];
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ingredients }) => {
  const [current, setCurrent] = React.useState('buns');

  const buns = ingredients.filter((el) => el.type === 'bun');
  const sauces = ingredients.filter((el) => el.type === 'sauce');
  const fillings = ingredients.filter((el) => el.type === 'main');

  return (
    <section className={styles.burgerIngredientsContainer}>
      <h1 className={styles.burgerIngredientsTitle}>Соберите бургер</h1>

      <div className={styles.burgerIngredientsTabs}>
        {buns.length > 0 && (
          <Tab value="buns" active={current === 'buns'} onClick={() => setCurrent('buns')}>
            Булки
          </Tab>
        )}
        {sauces.length > 0 && (
          <Tab value="sauces" active={current === 'sauces'} onClick={() => setCurrent('sauces')}>
            Соусы
          </Tab>
        )}
        {fillings.length > 0 && (
          <Tab value="fillings" active={current === 'fillings'} onClick={() => setCurrent('fillings')}>
            Начинки
          </Tab>
        )}
      </div>

      <div className={styles.burgerIngredientsList}>
        {buns.length > 0 && (
          <div className={styles.burgerIngredientsCategory}>
            <h2 className={styles.burgerIngredientsCategoryTitle}>Булки</h2>
            <ul className={styles.burgerIngredientsItems}>
              {buns.map((bun) => (
                <li key={bun._id} className={styles.ingredient}>
                  <img src={bun.image} alt={bun.name} className={styles.ingredientImage} />
                  <Counter count={1} size="default" extraClass="m-1" />
                  <div className={styles.ingredientPriceBlock}>
                    <span className={styles.ingredientPrice}>{bun.price}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={styles.ingredientName}>{bun.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {sauces.length > 0 && (
          <div className={styles.burgerIngredientsCategory}>
            <h2 className={styles.burgerIngredientsCategoryTitle}>Соусы</h2>
            <ul className={styles.burgerIngredientsItems}>
              {sauces.map((sauce) => (
                <li key={sauce._id} className={styles.ingredient}>
                  <img src={sauce.image} alt={sauce.name} className={styles.ingredientImage} />
                  <div className={styles.ingredientPriceBlock}>
                    <span className={styles.ingredientPrice}>{sauce.price}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={styles.ingredientName}>{sauce.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {fillings.length > 0 && (
          <div className={styles.burgerIngredientsCategory}>
            <h2 className={styles.burgerIngredientsCategoryTitle}>Начинки</h2>
            <ul className={styles.burgerIngredientsItems}>
              {fillings.map((filling) => (
                <li key={filling._id} className={styles.ingredient}>
                  <img src={filling.image} alt={filling.name} className={styles.ingredientImage} />
                  <div className={styles.ingredientPriceBlock}>
                    <span className={styles.ingredientPrice}>{filling.price}</span>
                    <CurrencyIcon type="primary" />
                  </div>
                  <p className={styles.ingredientName}>{filling.name}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default BurgerIngredients;