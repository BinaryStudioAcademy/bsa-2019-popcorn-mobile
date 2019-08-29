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
	Collections_StackNavigator,
	Movies_StackNavigator
} from './MenuNavigators';
import StoryComponent from './../../components/MainPage/Story/StoryCarousel/StoryCarousel';
import PostConstructor from '../../components/MainPage/Post/Constructor';
import PostConstructorNavigator from './PostConstructorNavigator';
import StoryConstructorNavigator from './StoryConstructorNavigator';

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
	PostConstructor: {
		screen: PostConstructorNavigator,
		navigationOptions: {
			drawerLabel: 'Create post'
		}
	},
	StoryConstructor: {
		screen: StoryConstructorNavigator,
		navigationOptions: {
			drawerLabel: 'Create story'
		}
	}
});

export default createAppContainer(HomeNavigator);
