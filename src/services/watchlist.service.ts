import callWebApi from './../helpers/webApi.helper';
import config from './../config';

export const getWatchlist = async (userId: string) => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: config.API_URL + `/api/watch/user/${userId}`
	});

	return res;
};

export const addToWatchlist = async (movieId: string) => {
	const res = await callWebApi({
		endpoint: config.API_URL + `/api/watch`,
		method: 'POST',
		body: {
			movieId,
			status: 'to_watch'
		}
	});
	return res;
};

export const updateWatchItem = async (id: string) => {
	const res = await callWebApi({
		endpoint: config.API_URL + `/api/watch/${id}`,
		method: 'PUT'
	});

	return res;
};

export const removeWatchItem = async (id: string) => {
	const res = await callWebApi({
		endpoint: config.API_URL + `/api/watch/${id}`,
		method: 'DELETE'
	});
	return res;
};

export const fetchMovieStatus = async (movieId: string) => {
	console.log(movieId);

	const res = await callWebApi({
		endpoint: config.API_URL + `/api/watch/movie/${movieId}`,
		method: 'GET'
	});
	console.log(res);
	return res;
};
