import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigator from '../StackNavigator/AuthNavigator';
import Main from '../../containers/Main/Main';

const AppNavigator = createSwitchNavigator(
	{
		Main: Main,
		Auth: AuthNavigator
	},
	{
		initialRouteName: 'Auth'
	}
);

export default createAppContainer(AppNavigator);
