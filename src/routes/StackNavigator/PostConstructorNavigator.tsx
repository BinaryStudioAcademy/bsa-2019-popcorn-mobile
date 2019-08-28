import { createStackNavigator } from 'react-navigation';
import PostConstructor from '../../components/MainPage/Post/Constructor';
import ChooseExtra from '../../components/MainPage/Post/Constructor/ChooseExtra';
import ChooseExtraOption from '../../components/MainPage/Post/Constructor/ChooseExtraOption';
import EventPage from '../../components/ContentPage/Events/EventPage';

const PostConstructorNavigator = createStackNavigator({
	Basic: {
		screen: PostConstructor,
		navigationOptions: {
			header: null
		}
	},
	ChooseExtra: {
		screen: ChooseExtra,
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
	}
});

export default PostConstructorNavigator;
