import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth-pages.module.css';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('https://norma.nomoreparties.space/api/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'Ошибка восстановления пароля');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка восстановления пароля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      {success ? (
        <div style={{ color: 'green', textAlign: 'center', marginBottom: 24 }}>
          Инструкция отправлена на ваш email
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
              type="email"
              placeholder="Укажите e-mail"
              name="email"
              value={email}
              onChange={handleChange}
              required onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <Button type="primary" size="medium" htmlType="submit" disabled={loading}>
            {loading ? 'Отправка...' : 'Восстановить'}
          </Button>
          {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
        </form>
      )}
      <div className={styles.links}>
        <p>
          Вспомнили пароль?{' '}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 