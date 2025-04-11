import React, {useState} from 'react';
import styles  from './app.module.css';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IIngredientData from "../../types/inretfaces/ingridient-data.interface";

const APP_DATA_BURGER_API_URL = 'https://norma.nomoreparties.space/api/ingredients';

const App:React.FC = () =>  {
  const [state, setState] = useState<IIngredientData[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch(APP_DATA_BURGER_API_URL);
      const data = await response.json() as any;
      setState((prevData) => [...prevData,...data.data]);

    } catch (e) {
      console.error(e)
    }
  }

  React.useEffect(() => {
    fetchData()
  } , [])

  return (
    <>
      <AppHeader />
      <main className={styles.appMain}>
        <BurgerIngredients ingredients={state}/>
        <BurgerConstructor state={state}/>
      </main>
    </>
  );
}

export default App;
