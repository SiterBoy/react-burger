import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useState, useMemo} from "react";
import BurgerConstructorListItem from "../burger-constructor-list-item/burger-constructor-list-item";
import {Modal} from "../modal/modal";
import {OrderDetails} from "../order-details/order-details";
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeIngredient, clearConstructor, moveIngredient } from '../../store/slices/constructor-slice';
import { decrementCounter, resetCounters } from '../../store/slices/ingredients-slice';
import { createOrder, clearOrder } from '../../store/slices/order-slice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  const { bun, ingredients } = useAppSelector(state => state.burgerConstructor);
  const { orderNumber, loading } = useAppSelector(state => state.order);

  const orderSum = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce((acc, current) => acc + current.price, 0);
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const canMakeOrder = () => {
    return Boolean(bun) && ingredients.length > 0;
  };

  const handleRemoveIngredient = (index: number) => {
    const removedIngredient = ingredients[index];
    dispatch(removeIngredient(index));
    dispatch(decrementCounter(removedIngredient._id));
  };

  const handleCreateOrder = async () => {
    if (!bun) return;

    const ingredientIds = [
      bun._id, 
      ...ingredients.map(ing => ing._id),
      bun._id  
    ];

    try {
      await dispatch(createOrder(ingredientIds)).unwrap();
      setIsOrderModalOpen(true);
      dispatch(clearConstructor());
      dispatch(resetCounters());
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  const handleCloseModal = () => {
    setIsOrderModalOpen(false);
    dispatch(clearOrder());
  };

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={styles.burgerConstructorContainer}>
        <ul className={styles.burgerConstructorIngridientsList}>
          {bun && (
            <li className={styles.burgerConstructorIngridient} key={`${bun._id}-top`}>
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
            {ingredients.length > 0 && (
              ingredients.map((ingredient, index) => (
                <BurgerConstructorListItem 
                  key={`${ingredient._id}-${index}`}
                  ingridient={ingredient}
                  index={index}
                  onRemove={() => handleRemoveIngredient(index)}
                  moveCard={moveCard}
                />
              ))
            )}
          </div>

          {bun && (
            <li className={styles.burgerConstructorIngridient} key={`${bun._id}-bottom`}>
              <button className={styles.burgerConstructorMoveButton} aria-label="Open task menu" aria-haspopup="true">
                <DragIcon type={'primary'} className={styles.burgerConstructorDragIcon}/>
              </button>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
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
          <Button 
            htmlType="button" 
            type="primary" 
            size="medium" 
            onClick={handleCreateOrder}
            disabled={!canMakeOrder() || loading}
          >
            {loading ? 'Загрузка...' : 'Оформить заказ'}
          </Button>
        </footer>
        <Modal isOpen={isOrderModalOpen} onClose={handleCloseModal}>
          <OrderDetails orderId={orderNumber || 0}/>
        </Modal>
      </section>
    </DndProvider>
  );
}

export default BurgerConstructor;