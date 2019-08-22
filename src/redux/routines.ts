import { createRoutine } from 'redux-saga-routines';

export const login = createRoutine('LOGIN');
export const register = createRoutine('REGISTER');
export const fetchUser = createRoutine('FETCH_USER');
export const fetchStories = createRoutine('FETCH_STORIES');
export const fetchStory  = createRoutine('FETCH_STORY');
export const fetchMovies = createRoutine('FETCH_MOVIES');
export const fetchPosts = createRoutine('FETCH_POSTS');
export const fetchMovie = createRoutine('FETCH_MOVIE');
export const fetchUserEvents = createRoutine('FETCH_EVENTS');