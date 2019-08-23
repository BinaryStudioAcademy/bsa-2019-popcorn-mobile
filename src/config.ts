import { APP_API_URL } from 'react-native-dotenv';
const config = {
	API_URL: APP_API_URL || 'http://192.168.0.105:5000',
	DEFAULT_AVATAR: '/images/default/avatar-default.png',
	DEFAULT_EVENT_IMAGE: '/src/assets/general/event.jpg',
	DEFAULT_MOVIE_IMAGE: '/images/default/movie-default.png',
	POSTER_PATH: 'https://image.tmdb.org/t/p/w500'
};

export default config;
