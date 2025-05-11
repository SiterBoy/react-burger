import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './App.module.css';

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.app}>
          <AppHeader />
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </div>
      </DndProvider>
    </Provider>
  );
}

export default App; 