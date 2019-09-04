import React from 'react';
import { createStackNavigator } from 'react-navigation';
import UserProfile from '../../views/UserPageView/UserPageView';
import FollowersList from '../../components/Followers/FollowersList';
import FollowedList from '../../components/Followers/FollowedList';
import Header from '../../components/Followers/Header';

const UserProfileNavigation = createStackNavigator({
	Profile: {
		screen: UserProfile,
		navigationOptions: {
			header: null
		}
	},
    Followers: {
        screen: FollowersList,
        navigationOptions: {
            header: ({ navigation }) => <Header navigation={navigation}/>
        }
    },
    Followed: {
        screen: FollowedList,
        navigationOptions: {
            header: ({ navigation }) => <Header navigation={navigation}/>
        }
    }
});

export default UserProfileNavigation;