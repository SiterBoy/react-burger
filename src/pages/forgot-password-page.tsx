import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth-pages.module.css';
import { request } from '../utils/api';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data: { success: boolean; message?: string } = await request(
        '/password-reset',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );
      if (data.success) {
        localStorage.setItem('canReset', '1');
        navigate('/reset-password');
      } else {
        setError(data.message || 'Ошибка восстановления пароля');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Ошибка восстановления пароля:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='Укажите e-mail'
          name='email'
          value={email}
          onChange={handleChange}
          required
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Button
          type='primary'
          size='medium'
          htmlType='submit'
          disabled={loading}
        >
          {loading ? 'Отправка...' : 'Восстановить'}
        </Button>
        {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
      </form>
      <div className={styles.links}>
        <p>
          Вспомнили пароль?{' '}
          <Link to='/login' className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
