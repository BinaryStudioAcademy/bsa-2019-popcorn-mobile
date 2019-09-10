export interface IMovieListPreview {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	isPrivate: boolean;
	moviesId: string[];
	createdAt: Date;
}

export interface IMovie {
	id: string;
	title: string;
	poster_path: string;
	release_date: string;
	runtime: number;
	overview: string;
	genres: string[];
	watchInfo?: IWatchListId;
}

export interface IWatchListId {
	id: string;
	movieId: string;
	status: string;
}

export interface IMovieListDetails {
	movieList: {
		id: string;
		title: string;
		description: string;
		isPrivate: boolean;
		imageUrl: string;
		moviesId: string[];
		createdAt: Date;
		user: {
			id: string;
			name: string;
			avatar: string;
		};
	};
	movies: IMovie[];
}

export interface INewMovieList {
	title: string;
	isPrivate: boolean;
	description?: string;
	imageUrl?: string;
	moviesId: string[];
}
