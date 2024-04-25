import { get, post, put } from './request';

export const getCurrentUser = () => get('users/current');

export const login = (uid, password) =>
  post('login', { uid, password });

export const updateCurrentUser = payload =>
  put('users/current', payload); 
