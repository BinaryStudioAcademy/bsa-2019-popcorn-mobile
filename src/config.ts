import { APP_API_URL } from 'react-native-dotenv'
const config = {
	API_URL: APP_API_URL || 'http://192.168.0.191:5000',
	DEFAULT_AVATAR: '/images/default/avatar-default.png',
	DEFAULT_EVENT_IMAGE: '/images/default/event-default.png',
	DEFAULT_MOVIE_IMAGE: '/images/default/movie-default.png',
	POSTER_PATH: 'https://image.tmdb.org/t/p/w500'
};

export default config;