import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IIngredientData from '../../types/interfaces/ingridient-data.interface';
import BurgerIngredientsListItem from '../burger-ingredients-list-item/burger-ingredients-list-item';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentTab } from '../../store/slices/tabs-slice';
import { addIngredient } from '../../store/slices/constructor-slice';
import { incrementCounter } from '../../store/slices/ingredients-slice';
import { setIngredientDetails } from '../../store/slices/ingredient-details-slice';
import { RootState } from '../../store/types';

const BurgerIngredients: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = useAppSelector(
    (state: RootState) => state.tabs.currentTab
  );
  const ingredients = useAppSelector(
    (state: RootState) => state.ingredients.items
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const buns = ingredients.filter((el: IIngredientData) => el.type === 'bun');
  const sauces = ingredients.filter(
    (el: IIngredientData) => el.type === 'sauce'
  );
  const fillings = ingredients.filter(
    (el: IIngredientData) => el.type === 'main'
  );

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      threshold: 0,
      rootMargin: '-100px 0px 0px 0px',
    };

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const type = entry.target.getAttribute('data-type');
            if (type === 'bun' || type === 'sauce' || type === 'main') {
              dispatch(setCurrentTab(type));
            }
          }
        });
      },
      options
    );

    const headers = document.querySelectorAll('[data-type]');
    headers.forEach(header => observer.observe(header));

    return () => {
      headers.forEach(header => observer.unobserve(header));
    };
  }, [dispatch]);

  const handleTabClick = (type: 'bun' | 'sauce' | 'main'): void => {
    dispatch(setCurrentTab(type));
    const element = document.querySelector(`[data-type="${type}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleIngredientClick = (ingredient: IIngredientData): void => {
    dispatch(setIngredientDetails(ingredient));
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  const handleIngredientDrop = (ingredient: IIngredientData): void => {
    dispatch(addIngredient(ingredient));
    dispatch(incrementCounter(ingredient._id));
  };

  const renderCategory = (type: 'bun' | 'sauce' | 'main') => {
    const categoryMap = {
      bun: { items: buns, title: 'Булки' },
      sauce: { items: sauces, title: 'Соусы' },
      main: { items: fillings, title: 'Начинки' },
    };

    const category = categoryMap[type];
    if (category.items.length === 0) return null;

    return (
      <div className={styles.burgerIngredientsCategory}>
        <h2 data-type={type} className={styles.burgerIngredientsCategoryTitle}>
          {category.title}
        </h2>
        <ul className={styles.burgerIngredientsItems}>
          {category.items.map((item: IIngredientData) => (
            <BurgerIngredientsListItem
              key={item._id}
              onClick={() => handleIngredientClick(item)}
              onDrop={() => handleIngredientDrop(item)}
              ingridient={item}
            />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className={styles.burgerIngredientsContainer}>
      <h1 className={styles.burgerIngredientsTitle}>Соберите бургер</h1>

      <div className={styles.burgerIngredientsTabs}>
        {buns.length > 0 && (
          <Tab
            value='bun'
            active={currentTab === 'bun'}
            onClick={() => handleTabClick('bun')}
          >
            Булки
          </Tab>
        )}
        {sauces.length > 0 && (
          <Tab
            value='sauce'
            active={currentTab === 'sauce'}
            onClick={() => handleTabClick('sauce')}
          >
            Соусы
          </Tab>
        )}
        {fillings.length > 0 && (
          <Tab
            value='main'
            active={currentTab === 'main'}
            onClick={() => handleTabClick('main')}
          >
            Начинки
          </Tab>
        )}
      </div>

      <div ref={containerRef} className={styles.burgerIngredientsList}>
        {renderCategory('bun')}
        {renderCategory('sauce')}
        {renderCategory('main')}
      </div>
    </section>
  );
};

export default BurgerIngredients;
