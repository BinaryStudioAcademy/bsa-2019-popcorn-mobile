import { createRoutine } from 'redux-saga-routines';

export const login = createRoutine('LOGIN');
export const register = createRoutine('REGISTER');
export const fetchUser = createRoutine('FETCH_USER');
export const fetchStories = createRoutine('FETCH_STORIES');
export const fetchStory = createRoutine('FETCH_STORY');
export const fetchMovies = createRoutine('FETCH_MOVIES');
export const fetchFiltred = createRoutine('FETCH_FILTRED_MOVIES');
export const fetchGenres = createRoutine('FETCH_GENRES');
export const fetchPosts = createRoutine('FETCH_POSTS');
export const fetchUserEvents = createRoutine('FETCH_USER_EVENTS');
export const fetchEvents = createRoutine('FETCH_EVENTS');
export const fetchUserSurveys = createRoutine('FETCH_USER_SURVEYS');
export const createEventVisitor = createRoutine('CREATE_EVENT_VISITOR');
export const updateEventVisitor = createRoutine('UPDATE_EVENT_VISITOR');
export const deleteEventVisitor = createRoutine('DELETE_EVENT_VISITOR');
export const fetchMovie = createRoutine('FETCH_MOVIE');
export const fetchUserTops = createRoutine('FETCH_USER_TOPS');
export const fetchTops = createRoutine('FETCH_TOPS');
export const fetchEventById = createRoutine('FETCH_EVENT_BY_ID');
export const fetchNotifications = createRoutine('FETCH_NOTIFICATIONS');
export const readNotification = createRoutine('READ_NOTIFICATION');
export const getReviewsByMovieId = createRoutine('GET_MOVIE_REVIEWS');
export const setReviewReaction = createRoutine('SET_REVIEW_REACTION');
export const fetchFollowers = createRoutine('FETCH_FOLLOWERS');
export const fetchFollowersCount = createRoutine('FETCH_FOLLOWERS_COUNT');
export const fetchFollowed = createRoutine('FETCH_FOLLOWED');
export const fetchFollowedCount = createRoutine('FETCH_FOLLOWED_COUNT');
export const fetchStatus = createRoutine('FETCH_STATUS');
export const changeStatus = createRoutine('CHANGE_STATUS');
export const fetchUserById = createRoutine('FETCH_USER_BY_ID');
export const clearUserInfo = createRoutine('CLEAR_USER_INFO');
export const fetchUserWatchList = createRoutine('FETCH_WATCH_LIST');
export const fetchMovieStatus = createRoutine('FETCH_MOVIE_STATUS');
