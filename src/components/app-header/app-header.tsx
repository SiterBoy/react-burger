import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';

const AppHeader: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path ? 'primary' : 'secondary';
    }
    return location.pathname.startsWith(path) ? 'primary' : 'secondary';
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.menuItem}>
            <BurgerIcon type={isActive('/')} /> Конструктор
          </Link>
          <Link to="/feed" className={styles.menuItem}>
            <ListIcon type={isActive('/feed')} /> Лента заказов
          </Link>
        </nav>
        <div className={styles.logo}>
          <Link to="/">
            <Logo/>
          </Link>
        </div>
        <div className={styles.profile}>
          <Link to="/profile" className={styles.menuItem}>
            <ProfileIcon type={isActive('/profile')} /> Личный кабинет
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;