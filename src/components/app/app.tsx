import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchIngredients } from '../../store/slices/ingredients-slice';
import { init } from '../../store/slices/app-slice';
import { RootState } from '../../store/types';
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
import FeedPage from '../../pages/feed-page';
import OrderDetailsPage from '../../pages/order-details-page';
import ProfileOrdersPage from '../../pages/profile-orders-page';
import ProfileOrderDetailsPage from '../../pages/profile-order-details-page';

const AppRoutes = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const background = location.state && location.state.background;
  const { loading } = useAppSelector((state: RootState) => state.user);
  const { initialized } = useAppSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(init());
  }, [dispatch]);

  if (!initialized || loading) {
    return (
      <div className={styles.app}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px'
        }}>
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.appMain}>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:number" element={<OrderDetailsPage />} />
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
