import { Store } from '@reduxjs/toolkit';
import IIngredientData from '../types/interfaces/ingridient-data.interface';

export type TabType = 'bun' | 'sauce' | 'main';

export interface IConstructorIngredient extends IIngredientData {
  uuid: string;
}

export interface RootState {
  user: {
    user: { email: string; name: string } | null;
    loading: boolean;
    error: string | null;
    isAuth: boolean;
  };
  app: {
    initialized: boolean;
  };
  ingredients: {
    items: Array<{
      _id: string;
      name: string;
      type: TabType;
      proteins: number;
      fat: number;
      carbohydrates: number;
      calories: number;
      price: number;
      image: string;
      image_mobile: string;
      image_large: string;
      __v: number;
    }>;
    loading: boolean;
    error: string | null;
    counters: Record<string, number>;
  };
  burgerConstructor: {
    bun: IConstructorIngredient | null;
    ingredients: IConstructorIngredient[];
  };
  order: {
    orderNumber: number | null;
    loading: boolean;
    error: string | null;
  };
  tabs: {
    currentTab: TabType;
  };
  ingredientDetails: {
    ingredient: IIngredientData | null;
  };
}

export type AppStore = Store<RootState>;
export type AppDispatch = AppStore['dispatch']; 