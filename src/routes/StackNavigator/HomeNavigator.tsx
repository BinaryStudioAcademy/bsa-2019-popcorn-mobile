import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator
} from 'react-navigation';
import {
	FirstActivity_StackNavigator,
	Messages_StackNavigator,
	Events_StackNavigator,
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
		screen: Events_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Events'
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
