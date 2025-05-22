import React, {useEffect} from 'react';
import styles  from './app.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useAppDispatch } from '../../store/hooks';
import { fetchIngredients } from '../../store/slices/ingredients-slice';

const App: React.FC = () =>  {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.appMain}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
