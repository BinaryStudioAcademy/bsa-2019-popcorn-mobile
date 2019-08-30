import { createStackNavigator } from 'react-navigation';
import Home from '../../views/HomeView';
import Messages from '../../views/MessagesView';
import Collections from '../../views/CollectionsView';
import Header from '../../components/Header/Header';
import SurveyNavigator from '../StackNavigator/SurveyNavigator';
import EventsTab from '../../components/ContentPage/Events/EventTab';
import MovieNavigator from './MovieNavigator';
import TopsTab from '../../components/ContentPage/Tops/TopTab';
import ActivityNavigator from '../StackNavigator/ActivityNavigator';
import ChooseExtraOption from '../../components/MainPage/Story/StoryModal/ChooseExtraOption';
import EventPage from '../../components/ContentPage/Events/EventPage';
import TopPage from '../../components/ContentPage/Tops/TopPage';
import SurveyPage from '../../components/SurveyPage/SurveyPage';
import ControlledVertical from '../../components/MainPage/Story/StoryModal/ColorPicker';


export const FirstActivity_StackNavigator = createStackNavigator({
	First: {
		screen: Home,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	},
	ChooseExtraOption: {
		screen: ChooseExtraOption,
		navigationOptions: {
			header: null
		}
	},
	EventPage: {
		screen: EventPage,
		navigationOptions: {
			header: null
		}
	},
	TopPage: {
		screen: TopPage,
		navigationOptions: {
			header: null
		}
	},
	SurveyPage: {
		screen: SurveyPage,
		navigationOptions: {
			header: null
		}
	},
	ColorPicker: {
		screen: ControlledVertical,
		navigationOptions: {
			header: null
		}
	}
});

export const Messages_StackNavigator = createStackNavigator({
	Second: {
		screen: Messages,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Event_StackNavigator = createStackNavigator({
	Third: {
		screen: EventsTab,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Top_StackNavigator = createStackNavigator({
	Fourth: {
		screen: TopsTab,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Survey_StackNavigator = createStackNavigator({
	Fifth: {
		screen: SurveyNavigator,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Collections_StackNavigator = createStackNavigator({
	Sixth: {
		screen: Collections,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Movies_StackNavigator = createStackNavigator({
	Fourth: {
		screen: MovieNavigator,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Notifications_Navigator = createStackNavigator({
	Seventh: {
		screen: ActivityNavigator,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}});
export const UserPage_StackNavigator = createStackNavigator({
	Fourth: {
		screen: UserPageView,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});
