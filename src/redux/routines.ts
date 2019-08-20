import { createRoutine } from 'redux-saga-routines';

export const login = createRoutine('LOGIN');
export const register = createRoutine('REGISTER');
export const fetchUser = createRoutine('FETCH_USER');
