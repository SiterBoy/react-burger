import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState} from "react";
import IIngredientData from "../../types/inretfaces/ingridient-data.interface";
import BurgerConstructorListItem from "../burger-constructor-list-item/burger-constructor-list-item";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../order-details/order-details";

interface BurgerConstructorProps {
  state: IIngredientData[]
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({state}) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const currentOrderId = 699678;
  const bun = state.find((ingredient) =>  ingredient.type === 'bun');
  const otherIngredients = state.filter((item) => item.type !== 'bun');
  const orderSum = state.reduce((acc, current) => { return acc + current.price}, 0)

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
            <div className={styles.scrollAreaGap}></div>
          </li>
        )}

        <div className={styles.burgerConstructorIngridientsListScrollArea}>
          {otherIngredients.length > 0 && (
            otherIngredients.map((ingredient) => (
             <BurgerConstructorListItem  ingridient={ingredient}/>
            ))
          )}
        </div>


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
            <div className={styles.scrollAreaGap}></div>
          </li>
        )}
      </ul>


      <footer className={styles.burgerConstructorOrderSummary}>
        <div className={styles.burgerConstructorIngridientPriceContainer}>
          <span className={styles.burgerConstructorPrice}>{orderSum}</span>
          <CurrencyIcon type={'primary'} className={styles.burgerConstructorTotalPriceIcon}/>
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={() => setIsOrderModalOpen(true)}>
          Оформить заказ
        </Button>
      </footer>
        <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)}>
          <OrderDetails orderId={currentOrderId}/>
        </Modal>
    </section>
  );
}

export default BurgerConstructor;