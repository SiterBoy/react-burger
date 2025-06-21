import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector, useForm } from '../store/hooks';
import { registerUser } from '../store/slices/user-slice';
import styles from './auth-pages.module.css';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(state => state.user);

  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(values)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          value={values.password}
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
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </form>
      <div className={styles.links}>
        <p>
          Уже зарегистрированы?{' '}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 