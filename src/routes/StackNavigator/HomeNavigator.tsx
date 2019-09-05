import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator
} from 'react-navigation';
import {
	Messages_StackNavigator,
	Event_StackNavigator,
	Survey_StackNavigator,
	Top_StackNavigator,
	Collections_StackNavigator,
	Movies_StackNavigator,
	Notifications_Navigator,
	UserPage_StackNavigator,
	Review_StackNavigator,
	FirstActivity_StackNavigator
} from './MenuNavigators';
import StoryComponent from './../../components/MainPage/Story/StoryCarousel/StoryCarousel';
import PostConstructorNavigator from './PostConstructorNavigator';

const HomeNavigator = createDrawerNavigator({
	Home: {
		screen: FirstActivity_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Home'
		}
	},
	Profile: {
		screen: UserPage_StackNavigator,
		navigationOptions: {
			drawerLabel: 'My profile'
		}
	},

	Messages: {
		screen: Messages_StackNavigator,
		navigationOptions: ({ navigation }) => ({
			drawerLabel: 'Messages',
			navigation
		})
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
	},
	Movies: {
		screen: Movies_StackNavigator,
		navigationOptions: {
			drawerLabel: 'Movies'
		}
	},
	Story: {
		screen: StoryComponent,
		navigationOptions: {
			header: null
		}
	},

	Notifications: {
		screen: Notifications_Navigator,
		navigationOptions: {
			drawerLabel: () => null
		}
	},

	PostConstructor: {
		screen: PostConstructorNavigator,
		navigationOptions: {
			drawerLabel: 'Create post'
		}
	},

	UserPage: {
		screen: UserPage_StackNavigator,
		navigationOptions: {
			drawerLabel: () => null
		}
	}
});

export default createAppContainer(HomeNavigator);
