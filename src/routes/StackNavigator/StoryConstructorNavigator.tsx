import { createStackNavigator } from 'react-navigation';
import StoryConstructor from '../../components/MainPage/Story/StoryModal';
import ChooseExtra from '../../components/MainPage/Story/StoryModal/ChooseExtra';
import ChooseExtraOption from '../../components/MainPage/Story/StoryModal/ChooseExtraOption';
import EventPage from '../../components/ContentPage/Events/EventPage';
import TopPage from '../../components/ContentPage/Tops/TopPage';
import SurveyPage from '../../components/SurveyPage/SurveyPage';

const StoryConstructorNavigator = createStackNavigator({
	Basic: {
		screen: StoryConstructor,
		navigationOptions: {
			header: null
		}
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
	}
});

export default StoryConstructorNavigator;
