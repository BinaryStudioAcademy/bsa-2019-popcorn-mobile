import callWebApi from './../helpers/webApi.helper';
import config from './../config';

export const getAllMovies = async () => {
    const res =  await callWebApi({ method: 'GET', endpoint: config.API_URL + '/api/movie' })
    return res;
};

export const getMovieById = async (id: string) => {
    const res =  await callWebApi({ method: 'GET', endpoint: config.API_URL + `/api/movie/${id}`})
    return res;
};