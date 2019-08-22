import { createRoutine } from 'redux-saga-routines';

export const login = createRoutine('LOGIN');
export const register = createRoutine('REGISTER');
export const fetchUser = createRoutine('FETCH_USER');
export const fetchStories = createRoutine('FETCH_STORIES');
export const fetchStory  = createRoutine('FETCH_STORY');
export const fetchPosts = createRoutine('FETCH_POSTS');
export const fetchUserEvents = createRoutine('FETCH_USER_EVENTS');
export const fetchEvents = createRoutine('FETCH_EVENTS');
export const createEventVisitor = createRoutine('CREATE_EVENT_VISITOR');
export const updateEventVisitor = createRoutine('UPDATE_EVENT_VISITOR');
export const deleteEventVisitor = createRoutine('DELETE_EVENT_VISITOR');