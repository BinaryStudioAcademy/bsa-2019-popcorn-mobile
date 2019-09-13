import { createStackNavigator, createAppContainer } from 'react-navigation';
import UserProfile from '../../views/UserPageView/UserPageView';
import FollowersNavigator from '../TabNavigator/FollowersNavigator';
import MovieListView from '../../components/MainPage/Movie/index';
import Messages from '../../views/Messages/Messages';
import Header from '../../components/Header/Header';
import React from 'react';

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
	Messages: {
		screen: Messages,
		navigationOptions: ({ navigation }) => ({
			header: null,
			navigation
		})
	}
});

export default createAppContainer(UserProfileNavigation);
