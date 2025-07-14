import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/api';

interface UserState {
  user: { email: string; name: string } | null;
  loading: boolean;
  error: string | null;
  isAuth: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false,
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    thunkAPI
  ) => {
    const res = await request<{
      user: { email: string; name: string };
      accessToken: string;
      refreshToken: string;
    }>('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    localStorage.setItem(
      'accessToken',
      res.accessToken.replace(/^Bearer /, '')
    );
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    const res = await request<{
      user: { email: string; name: string };
      accessToken: string;
      refreshToken: string;
    }>('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem(
      'accessToken',
      res.accessToken.replace(/^Bearer /, '')
    );
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    await request('/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, thunkAPI) => {
    const res = await request<{ accessToken: string; refreshToken: string }>(
      '/auth/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
      }
    );
    localStorage.setItem(
      'accessToken',
      res.accessToken.replace(/^Bearer /, '')
    );
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  const res = await request<{ user: { email: string; name: string } }>(
    '/auth/user',
    {
      method: 'GET',
    }
  );
  return res.user;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    data: { name: string; email: string; password?: string },
    thunkAPI
  ) => {
    const res = await request<{ user: { email: string; name: string } }>(
      '/auth/user',
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      }
    );
    return res.user;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка авторизации';
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(getUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка получения пользователя';
        if (
          action.error.message?.includes('jwt') ||
          action.error.message?.includes('invalid') ||
          action.error.message?.includes('Token')
        ) {
          state.user = null;
          state.isAuth = false;
        }
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка обновления пользователя';
      });
  },
});

export default userSlice.reducer;
