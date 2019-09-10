import callWebApi from './../helpers/webApi.helper';
import config from './../config';

export const getAllPosts = async () => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: config.API_URL + '/api/post'
	});
	return res;
};

export const getUsersPosts = async userId => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: config.API_URL + '/api/post/user/' + userId
	});
	return res;
};

export const deletePost = async postId => {
	await callWebApi({
		method: 'DELETE',
		endpoint: config.API_URL + `/api/post/${postId}`
	});
};
