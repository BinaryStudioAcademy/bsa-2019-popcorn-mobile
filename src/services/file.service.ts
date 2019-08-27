import config from '../config';
import { Storage } from '../helpers/storage.helper';
import RNFetchBlob from 'react-native-fetch-blob';

export const uploadFile = async (base64ImageData: string, format: string) => {
	const token = await Storage.get('token');
	const response = await RNFetchBlob.fetch(
		'POST',
		`${config.API_URL}/api/image/upload`,
		{
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data'
		},
		[{ name: 'image', filename: format, type: format, data: base64ImageData }]
	);
	const { imageUrl } = await response.json();

	let url;
	url =
		imageUrl.indexOf('\\') !== -1 ? imageUrl.split(`\\`) : imageUrl.split(`/`);
	url.shift();
	url = url.join('/');

	return config.API_URL + '/' + url;
};

export const uploadBase64 = async (
	base64DataString: string,
	format: string
) => {
	const token = await Storage.get('token');
	const response = await fetch(`${config.API_URL}/api/image/upload`, {
		body: JSON.stringify({
			base: base64DataString,
			format
		}),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'octet-stream'
		},
		method: 'POST'
	});
	console.warn(response);
	const { imageUrl } = await response.json();

	let url;
	url =
		imageUrl.indexOf('\\') !== -1 ? imageUrl.split(`\\`) : imageUrl.split(`/`);
	url.shift();
	url = url.join('/');

	return config.API_URL + '/' + url;
};
