// @ts-ignore
import qs from 'qs';
import { Storage } from './storage.helper';

interface IRequestInit {
	endpoint: string;
	query?: object;
	method: string;
	skipAuthorization?: boolean;
	body?: object;
	parse?: boolean;
}

export default async (args: IRequestInit) => {
	try {
		let res: Response = await fetch(getUrl(args), await getArgs(args));

		if (args.parse === undefined || args.parse) return await res.json();

		return res;
	} catch (err) {
		throw err;
	}
};

const getUrl = (args: IRequestInit): RequestInfo =>
	args.endpoint + (args.query ? `?${qs.stringify(args.query)}` : '');

const getArgs = async (args: IRequestInit): Promise<object> => {
	const headers: {
		Authorization?: string;
		'Content-Type'?: string;
		Accept?: string;
	} = {};

	await Storage.get('token').then(value => {
		if (value && !args.skipAuthorization) {
			headers['Authorization'] = `Bearer ${value}`;
		}
	});

	let body = {};

	if (args.body) {
		if (args.method === 'GET') {
			throw new Error('GET request does not support request body.');
		}
		body = JSON.stringify(args.body);
		headers['Content-Type'] = 'application/json';
		headers['Accept'] = 'application/json';
	}

	return {
		method: args.method,
		headers,
		...(args.method === 'GET' ? {} : { body })
	};
};

const handlerError = (res: Response) => {
	if (!res.ok) {
		throw res.status || 'Something went wrong with request!';
	}
};
