import { createStackNavigator, createAppContainer } from 'react-navigation';
import TopList from '../../components/ContentPage/Tops/TopList';
import TopPage from '../../components/ContentPage/Tops/TopPage';

const TopNavigation = createStackNavigator(
	{
		TopList: {
			screen: TopList,
			navigationOptions: {
				header: null
			}
		},
		TopPage: {
			screen: TopPage,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: 'TopList'
	}
);

export default createAppContainer(TopNavigation);
