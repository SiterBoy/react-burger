import styles from './burger-constructor.module.css';
import { CurrencyIcon, DragIcon, DeleteIcon, LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
  return (
    <section className={styles.burgerConstructorContainer}>
      <ul className={styles.burgerConstructorIngridientsList}>
        <li className={styles.burgerConstructorIngridient}>
          <button className={styles.burgerConstructorMoveButton} aria-label="Open task menu" aria-haspopup="true">
            <DragIcon type={'primary'} className={styles.burgerConstructorDragIcon} />
          </button>

          <div className={styles.burgerConstructorCard}>
            <img
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              width="80"
              height="40"
              className={styles.burgerConstructorIngridientImg}
              alt="Img"
            />
            <span className={styles.burgerConstructorIngridientName}>Краторная булка N-200i (верх)</span>

            <div className={styles.burgerConstructorIngridientPriceConstainer}>
              <span className={styles.burgerConstructorIngridientPrice}>20</span>
              <CurrencyIcon type={'primary'} className={styles.burgerConstructorIngridientPriceIcon} />
            </div>

            <button className={styles.burgerConstructorIngridientDeleteButton} aria-label="Delete ingridient">
              <LockIcon type={'secondary'} />
            </button>
          </div>
        </li>

        <li className={styles.burgerConstructorIngridient}>
          <button className={styles.burgerConstructorMoveButton} aria-label="Open task menu" aria-haspopup="true">
            <DragIcon type={'primary'} className={styles.burgerConstructorDragIcon} />
          </button>

          <div className={styles.burgerConstructorCard}>
            <img
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              width="80"
              height="40"
              className={styles.burgerConstructorIngridientImg}
              alt="Img"
            />
            <span className={styles.burgerConstructorIngridientName}>Краторная булка N-200i (верх)</span>

            <div className={styles.burgerConstructorIngridientPriceConstainer}>
              <span className={styles.burgerConstructorIngridientPrice}>20</span>
              <CurrencyIcon type={'primary'} className={styles.burgerConstructorIngridientPriceIcon} />
            </div>

            <button className={styles.burgerConstructorIngridientDeleteButton} aria-label="Delete ingridient">
              <DeleteIcon type={'primary'} />
            </button>
          </div>
        </li>

        <li className={styles.burgerConstructorIngridient}>
          <button className={styles.burgerConstructorMoveButton} aria-label="Open task menu" aria-haspopup="true">
            <DragIcon type={'primary'} className={styles.burgerConstructorDragIcon} />
          </button>

          <div className={styles.burgerConstructorCard}>
            <img
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              width="80"
              height="40"
              className={styles.burgerConstructorIngridientImg}
              alt="Img"
            />
            <span className={styles.burgerConstructorIngridientName}>Краторная булка N-200i (верх)</span>

            <div className={styles.burgerConstructorIngridientPriceConstainer}>
              <span className={styles.burgerConstructorIngridientPrice}>20</span>
              <CurrencyIcon type={'primary'} className={styles.burgerConstructorIngridientPriceIcon} />
            </div>

            <button className={styles.burgerConstructorIngridientDeleteButton} aria-label="Delete ingridient">
              <DeleteIcon type={'primary'} />
            </button>
          </div>
        </li>

        <li className={styles.burgerConstructorIngridient}>
          <button className={styles.burgerConstructorMoveButton} aria-label="Open task menu" aria-haspopup="true">
            <DragIcon type={'primary'} className={styles.burgerConstructorDragIcon} />
          </button>

          <div className={styles.burgerConstructorCard}>
            <img
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              width="80"
              height="40"
              className={styles.burgerConstructorIngridientImg}
              alt="Img"
            />
            <span className={styles.burgerConstructorIngridientName}>Краторная булка N-200i (верх)</span>

            <div className={styles.burgerConstructorIngridientPriceConstainer}>
              <span className={styles.burgerConstructorIngridientPrice}>300</span>
              <CurrencyIcon type={'primary'} className={styles.burgerConstructorIngridientPriceIcon} />
            </div>

            <button className={styles.burgerConstructorIngridientDeleteButton} aria-label="Delete ingridient">
              <DeleteIcon type={'primary'} />
            </button>
          </div>
        </li>

        <li className={styles.burgerConstructorIngridient}>
          <button className={styles.burgerConstructorMoveButton} aria-label="Open task menu" aria-haspopup="true">
            <DragIcon type={'primary'} className={styles.burgerConstructorDragIcon} />
          </button>

          <div className={styles.burgerConstructorCard}>
            <img
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              width="80"
              height="40"
              className={styles.burgerConstructorIngridientImg}
              alt="Img"
            />
            <span className={styles.burgerConstructorIngridientName}>Краторная булка N-200i (верх)</span>

            <div className={styles.burgerConstructorIngridientPriceConstainer}>
              <span className={styles.burgerConstructorIngridientPrice}>20</span>
              <CurrencyIcon type={'primary'} className={styles.burgerConstructorIngridientPriceIcon} />
            </div>

            <button className={styles.burgerConstructorIngridientDeleteButton} aria-label="Delete ingridient">
              <DeleteIcon type={'primary'} />
            </button>
          </div>
        </li>

        <li className={styles.burgerConstructorIngridient}>
          <button className={styles.burgerConstructorMoveButton} aria-label="Open task menu" aria-haspopup="true">
            <DragIcon type={'primary'} className={styles.burgerConstructorDragIcon} />
          </button>

          <div className={styles.burgerConstructorCard}>
            <img
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              width="80"
              height="40"
              className={styles.burgerConstructorIngridientImg}
              alt="Img"
            />
            <span className={styles.burgerConstructorIngridientName}>Краторная булка N-200i (верх)</span>

            <div className={styles.burgerConstructorIngridientPriceConstainer}>
              <span className={styles.burgerConstructorIngridientPrice}>20</span>
              <CurrencyIcon type={'primary'} className={styles.burgerConstructorIngridientPriceIcon} />
            </div>

            <button className={styles.burgerConstructorIngridientDeleteButton} aria-label="Delete ingridient">
              <DeleteIcon type={'primary'} />
            </button>
          </div>
        </li>

        <li className={styles.burgerConstructorIngridient}>
          <button className={styles.burgerConstructorMoveButton} aria-label="Open task menu" aria-haspopup="true">
            <DragIcon type={'primary'} className={styles.burgerConstructorDragIcon} />
          </button>

          <div className={styles.burgerConstructorCard}>
            <img
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              width="80"
              height="40"
              className={styles.burgerConstructorIngridientImg}
              alt="Img"
            />
            <span className={styles.burgerConstructorIngridientName}>Краторная булка N-200i (верх)</span>

            <div className={styles.burgerConstructorIngridientPriceConstainer}>
              <span className={styles.burgerConstructorIngridientPrice}>20</span>
              <CurrencyIcon type={'primary'} className={styles.burgerConstructorIngridientPriceIcon} />
            </div>

            <button className={styles.burgerConstructorIngridientDeleteButton} aria-label="Delete ingridient">
              <DeleteIcon type={'primary'} />
            </button>
          </div>
        </li>

        <li className={styles.burgerConstructorIngridient}>
          <button className={styles.burgerConstructorMoveButton} aria-label="Open task menu" aria-haspopup="true">
            <DragIcon type={'primary'} className={styles.burgerConstructorDragIcon} />
          </button>

          <div className={styles.burgerConstructorCard}>
            <img
              src="https://code.s3.yandex.net/react/code/bun-01.png"
              width="80"
              height="40"
              className={styles.burgerConstructorIngridientImg}
              alt="Img"
            />
            <span className={styles.burgerConstructorIngridientName}>Краторная булка N-200i (верх)</span>

            <div className={styles.burgerConstructorIngridientPriceConstainer}>
              <span className={styles.burgerConstructorIngridientPrice}>20</span>
              <CurrencyIcon type={'primary'} className={styles.burgerConstructorIngridientPriceIcon} />
            </div>

            <button className={styles.burgerConstructorIngridientDeleteButton} aria-label="Delete ingridient">
              <LockIcon type={'secondary'} />
            </button>
          </div>
        </li>
      </ul>

      <footer className={styles.burgerConstructorOrderSummary}>
        <div className={styles.burgerConstructorIngridientPriceContainer}>
          <span className={styles.burgerConstructorPrice}>610</span>
          <CurrencyIcon type={'primary'} className={styles.burgerConstructorTotalPriceIcon} />
        </div>
        <button className={styles.burgerConstructorButton}>Оформить заказ</button>
      </footer>
    </section>
  );
}

export default BurgerConstructor;