import styles from './burger-ingredients.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

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

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({ ingredients }) => { return (
  // i will use ingredients later

  <section className={styles.burgerIngredientsContainer}>
      <h1 className={styles.burgerIngredientsTitle}>Соберите бургер</h1>

      <div className={styles.burgerIngredientsTabs}>
        <button className={`${styles.burgerIngredientsTab} ${styles.burgerIngredientsTabActive}`}>Булки</button>
        <button className={styles.burgerIngredientsTab}>Соусы</button>
        <button className={styles.burgerIngredientsTab}>Начинки</button>
      </div>

      <div className={styles.burgerIngredientsList}>
        <div className={styles.burgerIngredientsCategory}>
          <h2 className={styles.burgerIngredientsCategoryTitle}>Булки</h2>
          <ul className={styles.burgerIngredientsItems}>
            <li className={styles.ingredient}>
              <img
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt="Краторная булка N-200i"
                className={styles.ingredientImage}
              />
              <span className={styles.ingredientCounter}>1</span>
              <div className={styles.ingredientPriceBlock}>
                <span className={styles.ingredientPrice}>20</span>
                <CurrencyIcon type={"primary"} className={styles.ingredientCurrencyIcon}/>
              </div>
              <p className={styles.ingredientName}>Краторная булка N-200i</p>
            </li>
            <li className={styles.ingredient}>
              <img
                src="https://code.s3.yandex.net/react/code/bun-02.png"
                alt="Флуоресцентная булка R2-D3"
                className={styles.ingredientImage}
              />
              <span className={styles.ingredientCounter}>1</span>
              <div className={styles.ingredientPriceBlock}>
                <span className={styles.ingredientPrice}>20</span>
                <CurrencyIcon type={"primary"} className={styles.ingredientCurrencyIcon}/>
              </div>
              <p className={styles.ingredientName}>Флуоресцентная булка R2-D3</p>
            </li>
          </ul>
        </div>

        <div className={styles.burgerIngredientsCategory}>
          <h2 className={styles.burgerIngredientsCategoryTitle}>Соусы</h2>
          <ul className={styles.burgerIngredientsItems}>
            <li className={styles.ingredient}>
              <img
                src="https://code.s3.yandex.net/react/code/sauce-01.png"
                alt="Соус Spicy-X"
                className={styles.ingredientImage}
              />
              <div className={styles.ingredientPriceBlock}>
                <span className={styles.ingredientPrice}>10</span>
                <CurrencyIcon type={"primary"} className={styles.ingredientCurrencyIcon}/>
              </div>
              <p className={styles.ingredientName}>Соус Spicy-X</p>
            </li>
            <li className={styles.ingredient}>
              <img
                src="https://code.s3.yandex.net/react/code/sauce-02.png"
                alt="Фирменный Space Sauce"
                className={styles.ingredientImage}
              />
              <div className={styles.ingredientPriceBlock}>
                <span className={styles.ingredientPrice}>20</span>
                <CurrencyIcon type={"primary"} className={styles.ingredientCurrencyIcon}/>
              </div>
              <p className={styles.ingredientName}>Фирменный Space Sauce</p>
            </li>
            <li className={styles.ingredient}>
              <img
                src="https://code.s3.yandex.net/react/code/sauce-03.png"
                alt="Соус Spicy-X"
                className={styles.ingredientImage}
              />
              <div className={styles.ingredientPriceBlock}>
                <span className={styles.ingredientPrice}>30</span>
                <CurrencyIcon type={"primary"} className={styles.ingredientCurrencyIcon}/>
              </div>
              <p className={styles.ingredientName}>Соус Spicy-X</p>
            </li>
            <li className={styles.ingredient}>
              <img
                src="https://code.s3.yandex.net/react/code/sauce-04.png"
                alt="Фирменный Space Sauce"
                className={styles.ingredientImage}
              />
              <div className={styles.ingredientPriceBlock}>
                <span className={styles.ingredientPrice}>40</span>
                <CurrencyIcon type={"primary"} className={styles.ingredientCurrencyIcon}/>
              </div>
              <p className={styles.ingredientName}>Фирменный Space Sauce</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;