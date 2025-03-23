import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

function AppHeader () {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.nav}>
          <a href="/public" className={`${styles.menuItem} ${styles.active}`}>
            <BurgerIcon type='primary'/> Конструктор
          </a>
          <a href="/orders" className={styles.menuItem}>
            <ListIcon type="secondary" />
            Лента заказов
          </a>
        </nav>

        <div className={styles.logo}>
          <Logo/>
        </div>

        <div className={styles.profile}>
          <a href="/profile" className={styles.menuItem}>
            <ProfileIcon type="secondary" />
            Личный кабинет
          </a>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;