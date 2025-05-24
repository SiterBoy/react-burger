import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth-pages.module.css';

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={styles.form}>
        <Input
          type="text"
          placeholder="Имя"
          name="name"
          value={form.name}
          onChange={handleChange}
          required onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        />
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleChange}
          required onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        />
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          value={form.password}
          onChange={handleChange}
          required onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        />
        <Button type="primary" size="medium" htmlType="submit">
          Зарегистрироваться
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