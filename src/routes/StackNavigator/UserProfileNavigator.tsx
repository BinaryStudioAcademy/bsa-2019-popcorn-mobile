import React from 'react';
import { createStackNavigator } from 'react-navigation';
import UserProfile from '../../views/UserPageView/UserPageView';
import FollowersList from '../../components/Followers/FollowersList';
import FollowedList from '../../components/Followers/FollowedList';
import Header from '../../components/Followers/Header';
import FollowersNavigator from '../TabNavigator/FollowersNavigator';

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
	}
});

export default UserProfileNavigation;
