import { createStackNavigator } from 'react-navigation';
import UserProfile from '../../views/UserPageView/UserPageView';
import FollowersNavigator from '../TabNavigator/FollowersNavigator';
import Collection from '../../components/Collections/Collection';
import CollectionConstructor from '../../components/Collections/CollectionConstructor';
import MovieListView from '../../components/MainPage/Movie/index';

const UserProfileNavigation = createStackNavigator({
	Profile: {
		screen: UserProfile,
		navigationOptions: {
			header: null
		}
	},
	Follows: {
		screen: FollowersNavigator,
		navigationOptions: {
			header: null
		}
	},
	Collection: {
		screen: Collection,
		navigationOptions: {
			header: null
		}
	},
	CollectionConstructor: {
		screen: createStackNavigator({
			ChooseMovie: {
				screen: MovieListView,
				navigationOptions: {
					header: null
				}
			}
		}),
		navigationOptions: {
			header: null
		}
	}
});

export default UserProfileNavigation;
