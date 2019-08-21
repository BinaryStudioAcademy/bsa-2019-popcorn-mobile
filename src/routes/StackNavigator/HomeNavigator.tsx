import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator
} from 'react-navigation';
import {
	FirstActivity_StackNavigator,
	Messages_StackNavigator,
	Content_StackNavigator,
	Collections_StackNavigator,
	Movies_StackNavigator,
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
		screen: Content_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Content'
		}
	},
	Collections: {
		screen: Collections_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Collections'
		}
	},
	Movies: {
		screen: Movies_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Movies'
		}
	}
});

export default createAppContainer(HomeNavigator);
