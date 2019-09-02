import callWebApi from './../helpers/webApi.helper';

export const getWatchlist = async (userId: string) => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `/api/watch/user/${userId}`
	});

	return res;
};

export const addToWatchlist = async (movieId: string) => {
	const res = await callWebApi({
		endpoint: `/api/watch`,
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
		endpoint: `/api/watch/${id}`,
		method: 'PUT'
	});

	return res;
};

export const removeWatchItem = async (id: string) => {
	const res = await callWebApi({
		endpoint: `/api/watch/${id}`,
		method: 'DELETE'
	});
	return res;
};
