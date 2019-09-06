import { createStackNavigator } from 'react-navigation';
import MovieList from '../../components/MainPage/Movie';
import Movie from '../../components/MainPage/Movie/Movie/Movie';
import ReviewPage from '../../components/ReviewPage/ReviewPage';
import AdvancedSearch from '../../components/Search/AdvancedSearch';

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
	},
	ReviewPage: {
		screen: ReviewPage,
		navigationOptions: {
			header: null
		}
	},
	AdvancedSearch: {
		screen: AdvancedSearch,
		navigationOptions: {
			header: null
		}
	}
});

export default AuthNavigation;
