import React from 'react';
import { createStackNavigator } from 'react-navigation';
import EventPage from '../../components/ContentPage/Events/EventPage';
import NotificationList from '../../components/Notifications/NotificationList';
import Main from '../../views/HomeView';
import Messages from '../../views/Messages/Messages';
import UserProfile from './UserProfileNavigator';

const ActivityNavigator = createStackNavigator({
	Main: {
		screen: NotificationList,
		navigationOptions: {
			header: null
		}
	},
	Home: {
		screen: Main,
		navigationOptions: {
			header: null
		}
	},
	Event: {
		screen: EventPage,
		navigationOptions: {
			header: null
		}
	},
	Follower: {
		screen: createStackNavigator({
			Profile: {
				screen: UserProfile,
				navigationOptions: {
					header: null
				}
			}
		}),
		navigationOptions: {
			header: null
		}
	},
	Message: {
		screen: Messages,
		navigationOptions: {
			header: null
		}
	}
});

export default ActivityNavigator;
