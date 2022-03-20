import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { alert, defaults } from '@pnotify/core';

defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 1000;

// axios.defaults.baseURL = 'https://finapp-auth-backend.herokuapp.com/api';
axios.defaults.baseURL = 'http://localhost:8080/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk(
  '/auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/register', credentials);

      token.set(data.data.token);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const login = createAsyncThunk(
  '/auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      alert({
        text: 'Not authorized',
        hide: true,
        delay: 2000,
        sticker: false,
        closer: true,
        dir1: 'down',
      });
      return rejectWithValue(error);
    }
  },
);

const logout = createAsyncThunk('/auth/logout', async () => {
  try {
    await axios.get('/auth/logout');
    token.unset();
  } catch (error) {
    console.log(error);
  }
});

const fetchCurrentUser = createAsyncThunk(
  '/auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);

    try {
      const { data } = await axios.get('/auth/current');
      return data.user;
    } catch (error) {
      console.log(error);
    }
  },
);

const authOperations = {
  register,
  logout,
  login,
  fetchCurrentUser,
};
export default authOperations;
