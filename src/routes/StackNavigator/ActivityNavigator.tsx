import { createStackNavigator } from 'react-navigation';
import EventPage from '../../components/ContentPage/Events/EventPage';
import NotificationList from '../../components/Notifications/NotificationList';
import { FirstActivity_StackNavigator } from '../StackNavigator/MenuNavigators';
import Main from '../../views/HomeView';

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
	}
});

export default ActivityNavigator;
