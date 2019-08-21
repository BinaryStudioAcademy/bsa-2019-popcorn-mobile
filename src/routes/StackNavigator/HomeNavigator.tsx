import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator
} from 'react-navigation';
import {
	FirstActivity_StackNavigator,
	Messages_StackNavigator,
	Event_StackNavigator,
	Survey_StackNavigator,
	Top_StackNavigator,
	Collections_StackNavigator
} from './MenuNavigators';

const HomeNavigator = createDrawerNavigator({
	Home: {
		screen: FirstActivity_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Home'
		}
	},

	Messages: {
		screen: Messages_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Messages'
		}
	},

	Events: {
		screen: Event_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Events'
		}
	},

	Tops: {
		screen: Top_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Tops'
		}
	},

	Surveys: {
		screen: Survey_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Surveys'
		}
	},

	Collections: {
		screen: Collections_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Collections'
		}
	}
});

export default createAppContainer(HomeNavigator);
