import config from '../config';
import { Storage } from '../helpers/storage.helper';
import RNFetchBlob from 'react-native-fetch-blob';

export const uploadFile = async (base64ImageData: string, format: string) => {
	const token = await Storage.get('token');
	let imgSrc = 'data:image/png;base64,' + base64ImageData;
	const response = await RNFetchBlob.fetch(
		'POST',
		`${config.API_URL}/api/image/upload`,
		{
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data'
		},
		[{ name: 'image', filename: 'img' + format, data: imgSrc }]
	);
	const { imageUrl } = await response.json();

	let url;
	url =
		imageUrl.indexOf('\\') !== -1 ? imageUrl.split(`\\`) : imageUrl.split(`/`);
	url.shift();
	url = url.join('/');

	return config.API_URL + '/' + url;
};
