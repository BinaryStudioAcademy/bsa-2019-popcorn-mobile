import callWebApi from './../helpers/webApi.helper';
import config from './../config';

export const getAllPosts = async () => {
    const res =  await callWebApi({ method: 'GET', endpoint: config.API_URL + '/api/post' })
    return res;
};