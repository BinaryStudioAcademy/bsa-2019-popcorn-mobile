import { createStackNavigator, createAppContainer } from 'react-navigation';
import EventList from '../../components/ContentPage/Events/EventList';
import EventPage from '../../components/ContentPage/Events/EventPage';

const EventsNavigation = createStackNavigator({
	EventList: {
		screen: EventList,
		navigationOptions: {
			header: null
		}
	},
	EventPage: {
		screen: EventPage,
		navigationOptions: {
			header: null
		}
	}
},
{
	initialRouteName: 'EventList'
});

export default createAppContainer(EventsNavigation);