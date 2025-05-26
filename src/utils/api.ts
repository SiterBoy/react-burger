export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Что-то пошло не так');
  }

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || 'Что-то пошло не так');
  }

  return data as T;
};

export const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  return checkResponse<T>(res);
}; 