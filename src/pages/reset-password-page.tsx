import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth-pages.module.css';

const ResetPasswordPage: React.FC = () => {
  const [form, setForm] = useState({
    password: '',
    code: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: form.password, token: form.code })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'Ошибка сброса пароля');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка сброса пароля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      {success ? (
        <div style={{ color: 'green', textAlign: 'center', marginBottom: 24 }}>
          Пароль успешно изменён
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
              type="password"
              placeholder="Введите новый пароль"
              name="password"
              value={form.password}
              onChange={handleChange}
              required onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <Input
              type="text"
              placeholder="Введите код из письма"
              name="code"
              value={form.code}
              onChange={handleChange}
              required onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <Button type="primary" size="medium" htmlType="submit" disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
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

export default ResetPasswordPage; 