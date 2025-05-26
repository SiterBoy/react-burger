import { getUser, refreshToken } from '../slices/user-slice';

export const authMiddleware = (store: any) => (next: any) => async (action: any) => {
  const result = next(action);

  if (action.type === 'app/init') {
    const accessToken = localStorage.getItem('accessToken');
    const refreshTokenValue = localStorage.getItem('refreshToken');

    if (accessToken && refreshTokenValue) {
      try {
        await store.dispatch(getUser());
      } catch (error) {
        try {
          await store.dispatch(refreshToken());
          await store.dispatch(getUser());
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    }
  }

  return result;
}; 