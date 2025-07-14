import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import BurgerConstructorListItem from '../burger-constructor-list-item/burger-constructor-list-item';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/types';
import {
  removeIngredient,
  clearConstructor,
  moveIngredient,
  addIngredient,
} from '../../store/slices/constructor-slice';
import {
  decrementCounter,
  resetCounters,
  incrementCounter,
} from '../../store/slices/ingredients-slice';
import { createOrder, clearOrder } from '../../store/slices/order-slice';
import IIngredientData from '../../types/interfaces/ingridient-data.interface';

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const { bun, ingredients } = useAppSelector(
    (state: RootState) => state.burgerConstructor
  );
  const { orderNumber, loading } = useAppSelector(
    (state: RootState) => state.order
  );
  const { isAuth } = useAppSelector((state: RootState) => state.user);

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item: IIngredientData) => {
      dispatch(addIngredient(item));
      dispatch(incrementCounter(item._id));
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  const orderSum = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (acc, current) => acc + current.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const canMakeOrder = () => {
    return Boolean(bun) && ingredients.length > 0;
  };

  const handleRemoveIngredient = (uuid: string) => {
    const removedIngredient = ingredients.find(ing => ing.uuid === uuid);
    if (removedIngredient) {
      dispatch(removeIngredient(uuid));
      dispatch(decrementCounter(removedIngredient._id));
    }
  };

  const handleCreateOrder = async () => {
    if (!isAuth) {
      navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }

    if (!bun) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map(ing => ing._id),
      bun._id,
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

  // Подключаем drop ref к элементу
  dropRef(ref);

  const backgroundColor = isOver ? 'rgba(76, 76, 255, 0.1)' : 'transparent';

  return (
    <section
      ref={ref}
      className={styles.burgerConstructorContainer}
      style={{ backgroundColor }}
      data-testid='constructor'
    >
      <ul className={styles.burgerConstructorIngridientsList}>
        {bun && (
          <li
            className={styles.burgerConstructorIngridient}
            key={`${bun._id}-top`}
            data-testid='bun-top'
          >
            <button
              className={styles.burgerConstructorMoveButton}
              aria-label='Open task menu'
              aria-haspopup='true'
            >
              <DragIcon
                type={'primary'}
                className={styles.burgerConstructorDragIcon}
              />
            </button>
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
            <div className={styles.scrollAreaGap}></div>
          </li>
        )}

        <div
          className={styles.burgerConstructorIngridientsListScrollArea}
          data-testid='ingredients-area'
        >
          {ingredients.length > 0 &&
            ingredients.map((ingredient, index) => (
              <BurgerConstructorListItem
                key={ingredient.uuid}
                ingridient={ingredient}
                index={index}
                onRemove={handleRemoveIngredient}
                moveCard={moveCard}
              />
            ))}
        </div>

        {bun && (
          <li
            className={styles.burgerConstructorIngridient}
            key={`${bun._id}-bottom`}
            data-testid='bun-bottom'
          >
            <button
              className={styles.burgerConstructorMoveButton}
              aria-label='Open task menu'
              aria-haspopup='true'
            >
              <DragIcon
                type={'primary'}
                className={styles.burgerConstructorDragIcon}
              />
            </button>
            <ConstructorElement
              type='bottom'
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
          <CurrencyIcon
            type={'primary'}
            className={styles.burgerConstructorTotalPriceIcon}
          />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={handleCreateOrder}
          disabled={!canMakeOrder() || loading}
          data-testid='order-button'
        >
          {loading ? 'Загрузка...' : 'Оформить заказ'}
        </Button>
      </footer>
      <Modal isOpen={isOrderModalOpen} onClose={handleCloseModal}>
        <OrderDetails orderId={orderNumber || 0} />
      </Modal>
    </section>
  );
};

export default BurgerConstructor;
