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

export const getPostById = async postId => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: config.API_URL + `/api/post/${postId}`
	});
	return res;
};

export const reactPost = async (userId, type, postId) => {
	await callWebApi({
		method: 'POST',
		endpoint: config.API_URL + '/api/post/reaction',
		body: {
			userId,
			type,
			postId
		},
		parse: false
	});
};
