import { createStackNavigator } from 'react-navigation';
import Main from '../../containers/Main/Main';
import EventPage from '../../components/ContentPage/Events/EventPage';
import { UserPage_StackNavigator } from './MenuNavigators';
import Messages from '../../views/Messages/Messages';

const NotificationNavigator = createStackNavigator({
	Main: {
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
		screen: UserPage_StackNavigator,
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

export default NotificationNavigator;
