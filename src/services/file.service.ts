import config from '../config';
import { Storage } from '../helpers/storage.helper';

export const uploadFile = async (file: FormData) => {
	const token = await Storage.get('token');
	let response = await fetch(`${config.API_URL}/api/image/upload`, {
		headers: {
			Authorization: `Bearer ${token}`
		},
		method: 'POST',
		body: file
	});
	const { imageUrl } = await response.json();

	let url;
	url =
		imageUrl.indexOf('\\') !== -1 ? imageUrl.split(`\\`) : imageUrl.split(`/`);
	url.shift();
	url = url.join('/');

	return config.API_URL + '/' + url;
};
