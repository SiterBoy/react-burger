import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients, { IngredientData } from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import { ingredients } from "./utils/data";

const typedIngredients = ingredients as IngredientData[];

function App() {
  return (
    <>
     <AppHeader />
      <main className="app-main">
        <BurgerIngredients ingredients={typedIngredients}/>
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
