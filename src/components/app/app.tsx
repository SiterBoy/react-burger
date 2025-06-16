import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { useAppDispatch } from '../../store/hooks';
import { fetchIngredients } from '../../store/slices/ingredients-slice';
import { init } from '../../store/slices/app-slice';
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home-page';
import LoginPage from '../../pages/login-page';
import RegisterPage from '../../pages/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page';
import ProfilePage from '../../pages/profile-page';
import IngredientDetailsPage from '../../pages/ingredient-details-page';
import NotFoundPage from '../../pages/not-found-page';
import ProtectedRouteElement from '../protected-route-element';
import ResetPasswordGuard from '../reset-password-guard/reset-password-guard';
import styles from './app.module.css';
import { IngredientModal } from '../ingredient-modal/ingredient-modal';

const AppRoutes = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(init());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.appMain}>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={
            <ProtectedRouteElement onlyUnAuth>
              <LoginPage />
            </ProtectedRouteElement>
          } />
          <Route path="/register" element={
            <ProtectedRouteElement onlyUnAuth>
              <RegisterPage />
            </ProtectedRouteElement>
          } />
          <Route path="/forgot-password" element={
            <ProtectedRouteElement onlyUnAuth>
              <ForgotPasswordPage />
            </ProtectedRouteElement>
          } />
          <Route path="/reset-password" element={
            <ProtectedRouteElement onlyUnAuth>
              <ResetPasswordGuard>
                <ResetPasswordPage />
              </ResetPasswordGuard>
            </ProtectedRouteElement>
          } />
          <Route path="/profile/*" element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          } />
          <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {background && (
          <Routes>
            <Route path="/ingredients/:id" element={<IngredientModal />} />
          </Routes>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () =>  {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
