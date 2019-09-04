import { createStackNavigator, createAppContainer } from 'react-navigation';
import SurveyPage from '../../components/SurveyPage/SurveyPage';
import SurveyList from '../../components/ContentPage/Surveys/SurveyList';

const SurveyNavigator = createStackNavigator(
	{
		SurveyList: {
			screen: SurveyList,
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
	},
	{
		initialRouteName: 'SurveyList'
	}
);

export default createAppContainer(SurveyNavigator);
