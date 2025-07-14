import React from 'react';
import { Link, useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { logoutUser } from '../store/slices/user-slice';
import styles from './profile-page.module.css';
import ProfileOrdersPage from './profile-orders-page';
import ProfileOrderDetailsPage from './profile-order-details-page';

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const isActive = (path: string) => {
    if (path === '/profile') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link
          to='/profile'
          className={`${styles.link} ${isActive('/profile') ? styles.active : ''}`}
        >
          Профиль
        </Link>
        <Link
          to='/profile/orders'
          className={`${styles.link} ${isActive('/profile/orders') ? styles.active : ''}`}
        >
          История заказов
        </Link>
        <button className={styles.link} type='button' onClick={handleLogout}>
          Выход
        </button>
      </nav>
      <div className={styles.content}>
        <Routes>
          <Route path="" element={<h1 className={styles.title}>Профиль</h1>} />
          <Route path="orders" element={<ProfileOrdersPage />} />
          <Route path="orders/:number" element={<ProfileOrderDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProfilePage;
