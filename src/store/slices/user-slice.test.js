import userReducer, {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getUser,
  updateUser,
} from './user-slice';

describe('user slice', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuth: false,
  };

  const mockUser = {
    email: 'test@example.com',
    name: 'Test User',
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  describe('registerUser', () => {
    it('should handle registerUser.pending', () => {
      const actual = userReducer(initialState, registerUser.pending(''));
      expect(actual.loading).toEqual(true);
      expect(actual.error).toEqual(null);
    });

    it('should handle registerUser.fulfilled', () => {
      const state = {
        ...initialState,
        loading: true,
        error: 'Previous error',
      };
      const actual = userReducer(state, registerUser.fulfilled(mockUser, ''));
      expect(actual.loading).toEqual(false);
      expect(actual.user).toEqual(mockUser);
      expect(actual.isAuth).toEqual(true);
    });

    it('should handle registerUser.rejected', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
      };
      const errorMessage = 'Registration failed';
      const actual = userReducer(
        state,
        registerUser.rejected(new Error(errorMessage), '', undefined, errorMessage)
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual(errorMessage);
    });

    it('should handle registerUser.rejected with default error message', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
      };
      const actual = userReducer(
        state,
        registerUser.rejected(new Error(), '', undefined)
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual('Ошибка регистрации');
    });
  });

  describe('loginUser', () => {
    it('should handle loginUser.pending', () => {
      const actual = userReducer(initialState, loginUser.pending(''));
      expect(actual.loading).toEqual(true);
      expect(actual.error).toEqual(null);
    });

    it('should handle loginUser.fulfilled', () => {
      const state = {
        ...initialState,
        loading: true,
        error: 'Previous error',
      };
      const actual = userReducer(state, loginUser.fulfilled(mockUser, ''));
      expect(actual.loading).toEqual(false);
      expect(actual.user).toEqual(mockUser);
      expect(actual.isAuth).toEqual(true);
    });

    it('should handle loginUser.rejected', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
      };
      const errorMessage = 'Login failed';
      const actual = userReducer(
        state,
        loginUser.rejected(new Error(errorMessage), '', undefined, errorMessage)
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual(errorMessage);
    });

    it('should handle loginUser.rejected with default error message', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
      };
      const actual = userReducer(
        state,
        loginUser.rejected(new Error(), '', undefined)
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual('Ошибка авторизации');
    });
  });

  describe('logoutUser', () => {
    it('should handle logoutUser.fulfilled', () => {
      const state = {
        ...initialState,
        user: mockUser,
        isAuth: true,
      };
      const actual = userReducer(state, logoutUser.fulfilled(undefined, ''));
      expect(actual.user).toEqual(null);
      expect(actual.isAuth).toEqual(false);
    });
  });

  describe('getUser', () => {
    it('should handle getUser.pending', () => {
      const actual = userReducer(initialState, getUser.pending(''));
      expect(actual.loading).toEqual(true);
      expect(actual.error).toEqual(null);
    });

    it('should handle getUser.fulfilled', () => {
      const state = {
        ...initialState,
        loading: true,
        error: 'Previous error',
      };
      const actual = userReducer(state, getUser.fulfilled(mockUser, ''));
      expect(actual.loading).toEqual(false);
      expect(actual.user).toEqual(mockUser);
      expect(actual.isAuth).toEqual(true);
    });

    it('should handle getUser.rejected', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
      };
      const errorMessage = 'Get user failed';
      const actual = userReducer(
        state,
        getUser.rejected(new Error(errorMessage), '', undefined, errorMessage)
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual(errorMessage);
    });

    it('should handle getUser.rejected with default error message', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
      };
      const actual = userReducer(
        state,
        getUser.rejected(new Error(), '', undefined)
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual('Ошибка получения пользователя');
    });

    it('should handle getUser.rejected with JWT error and clear auth', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
        user: mockUser,
        isAuth: true,
      };
      const actual = userReducer(
        state,
        getUser.rejected(new Error('jwt expired'), '', undefined, 'jwt expired')
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual('jwt expired');
      expect(actual.user).toEqual(null);
      expect(actual.isAuth).toEqual(false);
    });

    it('should handle getUser.rejected with invalid token error and clear auth', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
        user: mockUser,
        isAuth: true,
      };
      const actual = userReducer(
        state,
        getUser.rejected(new Error('invalid token'), '', undefined, 'invalid token')
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual('invalid token');
      expect(actual.user).toEqual(null);
      expect(actual.isAuth).toEqual(false);
    });
  });

  describe('updateUser', () => {
    it('should handle updateUser.pending', () => {
      const actual = userReducer(initialState, updateUser.pending(''));
      expect(actual.loading).toEqual(true);
      expect(actual.error).toEqual(null);
    });

    it('should handle updateUser.fulfilled', () => {
      const state = {
        ...initialState,
        loading: true,
        error: 'Previous error',
        user: { email: 'old@example.com', name: 'Old User' },
        isAuth: true,
      };
      const actual = userReducer(state, updateUser.fulfilled(mockUser, ''));
      expect(actual.loading).toEqual(false);
      expect(actual.user).toEqual(mockUser);
      expect(actual.isAuth).toEqual(true);
    });

    it('should handle updateUser.rejected', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
      };
      const errorMessage = 'Update failed';
      const actual = userReducer(
        state,
        updateUser.rejected(new Error(errorMessage), '', undefined, errorMessage)
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual(errorMessage);
    });

    it('should handle updateUser.rejected with default error message', () => {
      const state = {
        ...initialState,
        loading: true,
        error: null,
      };
      const actual = userReducer(
        state,
        updateUser.rejected(new Error(), '', undefined)
      );
      expect(actual.loading).toEqual(false);
      expect(actual.error).toEqual('Ошибка обновления пользователя');
    });
  });
}); 