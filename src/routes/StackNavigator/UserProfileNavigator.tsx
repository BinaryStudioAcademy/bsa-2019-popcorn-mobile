import { createStackNavigator, createAppContainer } from 'react-navigation';
import UserProfile from '../../views/UserPageView/UserPageView';
import FollowersNavigator from '../TabNavigator/FollowersNavigator';
import Collection from '../../components/Collections/Collection';
import MovieListView from '../../components/MainPage/Movie/index';
import Messages from '../../views/Messages/Messages';
import Header from '../../components/Header/Header';
import React from 'react';

const UserProfileNavigation = createStackNavigator(
	{
		Profile: {
			screen: props => (
				<UserProfile {...props} screenProps={{ showOwnProfile: true }} />
			),
			// screen:  props=> <UserProfile {...props} screenProps={{showOwnProfile: true}}/>,
			navigationOptions: {
				header: null
			},
			params: {
				showOwnProfile: true,
				userId: ''
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
		},
		Messages: {
			screen: Messages,
			navigationOptions: ({ navigation }) => ({
				header: null,
				navigation
			})
		}
	},
	{
		// initialRouteName: 'Profile',
	}
);

export default createAppContainer(UserProfileNavigation);
