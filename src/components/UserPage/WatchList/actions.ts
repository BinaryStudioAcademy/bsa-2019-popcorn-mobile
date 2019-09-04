import {
	ADD_TO_WATCHLIST,
	REMOVE_FROM_WATCHLIST,
	UPDATE_WATCHLIST_ITEM
} from './actionTypes';

export const addToWatchlist = (movieId, userId) => ({
	type: ADD_TO_WATCHLIST,
	payload: {
		movieId,
		userId
	}
});

export const removeFromWatchlist = (id, userId) => ({
	type: REMOVE_FROM_WATCHLIST,
	payload: {
		id,
		userId
	}
});

export const updateWatchlistItem = (id, userId) => ({
	type: UPDATE_WATCHLIST_ITEM,
	payload: {
		id,
		userId
	}
});
