import { getUser, refreshToken } from '../slices/user-slice';

export const authMiddleware = (store: any) => (next: any) => async (action: any) => {
  const result = next(action);

  if (action.type === 'app/init') {
    const accessToken = localStorage.getItem('accessToken');
    const refreshTokenValue = localStorage.getItem('refreshToken');

    if (accessToken && refreshTokenValue) {
      try {
        await store.dispatch(getUser()).unwrap();
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        if (errorMessage === 'jwt expired' || 
            errorMessage === 'jwt malformed' || 
            errorMessage === 'invalid token' ||
            errorMessage === 'Token is invalid' ||
            errorMessage?.includes('jwt') ||
            errorMessage?.includes('invalid')) {
          try {
            await store.dispatch(refreshToken()).unwrap();
            await store.dispatch(getUser()).unwrap();
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    }
  }

  return result;
}; 