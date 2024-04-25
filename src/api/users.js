import { get } from './request';

export const getCurrentUser = () => get('users/current');
