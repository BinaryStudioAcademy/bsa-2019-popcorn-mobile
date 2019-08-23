import callWebApi from './../helpers/webApi.helper';
import config from './../config';

export const getAllStories = async () => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: config.API_URL + '/api/story'
	});
	return res;
};
