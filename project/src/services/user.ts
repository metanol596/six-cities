import { UserData } from '../types/user-data';

const USER_KEY = 'six-cities-user-key';

export const setUser = (user: UserData): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const dropUser = (): void => {
  localStorage.removeItem(USER_KEY);
};
