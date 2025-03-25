import React from 'react';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients, { IngredientData } from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import { ingredients } from "./utils/data";
import styles  from './app.module.css';

const typedIngredients = ingredients as IngredientData[];
const currentConstructorState:IngredientData[] = [];
//add obe bun
currentConstructorState.push(typedIngredients.find(el => el.type === 'bun') as IngredientData);
//add another 7 ingredients to the constructor state
let currentIndex = 1
while(currentConstructorState.length < 8) {
  if(typedIngredients[currentIndex].type !== 'bun') {
    currentConstructorState.push(typedIngredients[currentIndex]);
    currentIndex++;
    continue;
  }
  currentIndex++;
}

function App() {
  return (
    <>
     <AppHeader />
      <main className={styles.appMain}>
        <BurgerIngredients ingredients={typedIngredients}/>
        <BurgerConstructor state={currentConstructorState}/>
      </main>
    </>
  );
}

export default App;
