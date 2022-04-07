import { UserData } from '../types/user-data';

const USER_KEY = 'six-cities-user-key';

export const setUser = (user: UserData): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): UserData => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : '';
};

export const deleteUser = (): void => {
  localStorage.removeItem(USER_KEY);
};
