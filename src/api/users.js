import { get, post } from './request';

export const getCurrentUser = () => get('users/current');

export const login = (uid, password) =>
  post('login', { uid, password });
