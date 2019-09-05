export interface IMovieListPreview {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	isPrivate: boolean;
	moviesId: string[];
	createdAt: Date;
}