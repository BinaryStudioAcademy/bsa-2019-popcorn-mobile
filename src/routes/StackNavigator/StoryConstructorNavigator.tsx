import { createStackNavigator } from 'react-navigation';
import PostConstructor from '../../components/MainPage/Story/StoryModal';
import ChooseExtra from '../../components/MainPage/Story/StoryModal/ChooseExtra';
import ChooseExtraOption from '../../components/MainPage/Story/StoryModal/ChooseExtraOption';
import EventPage from '../../components/ContentPage/Events/EventPage';

const StoryConstructorNavigator = createStackNavigator({
	StoryBasic: {
		screen: PostConstructor,
		navigationOptions: {
			header: null
		}
	},
	StoryChooseExtra: {
		screen: ChooseExtra,
		navigationOptions: {
			header: null
		}
	},
	StoryChooseExtraOption: {
		screen: ChooseExtraOption,
		navigationOptions: {
			header: null
		}
	},
	StoryEventPage: {
		screen: EventPage,
		navigationOptions: {
			header: null
		}
	}
});

export default StoryConstructorNavigator;
