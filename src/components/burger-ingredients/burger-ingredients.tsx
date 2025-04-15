import React, {useState} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IIngredientData from "../../types/inretfaces/ingridient-data.interface";
import BurgerIngredientsListItem from "../burger-ingredients-list-item/burger-ingredients-list-item";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {Modal} from "../modal/modal";



interface BurgerIngredientsProps {
  ingredients: IIngredientData[];
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ingredients }) => {
  const [current, setCurrent] = useState('buns');
  const [selectedIngredient, setSelectedIngredient] = useState<null | IIngredientData>(null);

  const buns = ingredients.filter((el) => el.type === 'bun');
  const sauces = ingredients.filter((el) => el.type === 'sauce');
  const fillings = ingredients.filter((el) => el.type === 'main');

  const closeModal = () => setSelectedIngredient(null);

  const handleOnClick = (item: IIngredientData) => () => {
    setSelectedIngredient(item);
  }


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
                <BurgerIngredientsListItem onClick={handleOnClick(bun)} ingridient={bun} />
              ))}
            </ul>
          </div>
        )}

        {sauces.length > 0 && (
          <div className={styles.burgerIngredientsCategory}>
            <h2 className={styles.burgerIngredientsCategoryTitle}>Соусы</h2>
            <ul className={styles.burgerIngredientsItems}>
              {sauces.map((sauce) => (
                <BurgerIngredientsListItem onClick={handleOnClick(sauce)} ingridient={sauce} />
              ))}
            </ul>
          </div>
        )}

        {fillings.length > 0 && (
          <div className={styles.burgerIngredientsCategory}>
            <h2 className={styles.burgerIngredientsCategoryTitle}>Начинки</h2>
            <ul className={styles.burgerIngredientsItems}>
              {fillings.map((filling) => (
                <BurgerIngredientsListItem onClick={handleOnClick(filling)} ingridient={filling} />
              ))}
            </ul>
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedIngredient} onClose={closeModal} >
        <IngredientDetails ingredient={selectedIngredient!} />
      </Modal>

    </section>
  );
};

export default BurgerIngredients;