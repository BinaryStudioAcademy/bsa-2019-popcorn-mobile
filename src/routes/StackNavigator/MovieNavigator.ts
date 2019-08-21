import { createStackNavigator } from 'react-navigation';
import MovieList from '../../components/MainPage/Movie';
import Movie from '../../components/MainPage/Movie/Movie/Movie';

const AuthNavigation = createStackNavigator({
	MovieList: {
		screen: MovieList,
		navigationOptions: {
			header: null
		}
	},
	Movie: {
		screen: Movie,
		navigationOptions: {
			header: null
		}
	}
});

export default AuthNavigation;
