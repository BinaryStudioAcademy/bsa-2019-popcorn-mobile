import IUser from '../../UserPage/IUser';

export default interface IPost {
	user: IUser;
	id: string;
	created_At?: string;
	image_url: string;
	description?: string;
	content?: {
		image: string;
		link: string;
		description: string;
	};
	comments?: {
		id: string;
		author: string;
		commentDate: string;
		commentBody: string;
		parentId?: string;
	}[];
	tags?: {
		id: string;
		tagName: string;
	}[];
}
