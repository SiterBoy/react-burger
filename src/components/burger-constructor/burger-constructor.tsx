import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientData} from "../burger-ingredients/burger-ingredients";
import React from "react";

interface BurgerConstructorProps {
  state: IngredientData[]
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({state}) => {

  const bun = state.find((ingredient) =>  ingredient.type === 'bun');
  const otherIngredients = state.filter((item) => item.type !== 'bun');

  return (
    <section className={styles.burgerConstructorContainer}>
      <ul className={styles.burgerConstructorIngridientsList}>

        {bun && (
        <li className={styles.burgerConstructorIngridient}>
          <button className={styles.burgerConstructorMoveButton} aria-label="Open task menu" aria-haspopup="true">
            <DragIcon type={'primary'} className={styles.burgerConstructorDragIcon}/>
          </button>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
          )}

        {otherIngredients.length > 0 && (
          otherIngredients.map((ingredient) => (
            <li key={ingredient._id} className={styles.burgerConstructorIngridient}>
              <button
                className={styles.burgerConstructorMoveButton}
                aria-label="Open task menu"
                aria-haspopup="true"
              >
                <DragIcon type="primary" className={styles.burgerConstructorDragIcon}/>
              </button>
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))
        )}


        {bun && (
          <li className={styles.burgerConstructorIngridient}>
            <button className={styles.burgerConstructorMoveButton} aria-label="Open task menu" aria-haspopup="true">
              <DragIcon type={'primary'} className={styles.burgerConstructorDragIcon}/>
            </button>

            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={200}
              thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
            />
        </li>
        )}
      </ul>


      <footer className={styles.burgerConstructorOrderSummary}>
        <div className={styles.burgerConstructorIngridientPriceContainer}>
          <span className={styles.burgerConstructorPrice}>610</span>
          <CurrencyIcon type={'primary'} className={styles.burgerConstructorTotalPriceIcon}/>
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
}

export default BurgerConstructor;