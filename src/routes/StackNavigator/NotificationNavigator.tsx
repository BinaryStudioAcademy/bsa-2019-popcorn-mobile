import { createStackNavigator } from 'react-navigation';
import Main from '../../containers/Main/Main';
import EventPage from '../../components/ContentPage/Events/EventPage';

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
	}
});

export default NotificationNavigator;
