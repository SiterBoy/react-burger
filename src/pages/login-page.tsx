import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser } from '../store/slices/user-slice';
import styles from './auth-pages.module.css';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, loading, error } = useAppSelector(state => state.user);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isAuth) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuth, navigate, location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap();
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Вход</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button 
          type="primary" 
          size="medium" 
          htmlType="submit"
          disabled={loading}
        >
          {loading ? 'Вход...' : 'Войти'}
        </Button>
      </form>
      <div className={styles.links}>
        <p>
          Вы — новый пользователь?{' '}
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p>
          Забыли пароль?{' '}
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; 