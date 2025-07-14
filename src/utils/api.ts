const BASE_URL = 'https://norma.nomoreparties.space/api';

interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
}

export const request = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const accessToken = localStorage.getItem('accessToken');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Что-то пошло не так');
  }

  return response.json();
}; 