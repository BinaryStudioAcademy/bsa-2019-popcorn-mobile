import {
	DrawerActions,
	createAppContainer,
	createDrawerNavigator,
	createStackNavigator,
	createBottomTabNavigator
} from 'react-navigation';
import LeftDrawer from './LeftDrawer';
import SidebarView from '../views/SidebarView';

export const RightDrawer = createDrawerNavigator(
	{
		Drawer: LeftDrawer
	},
	{
		getCustomActionCreators: (route, stateKey) => {
			return {
				toggleRightDrawer: () =>
					DrawerActions.toggleDrawer({
						key: stateKey
					})
			};
		},
		drawerPosition: 'right',
		contentComponent: SidebarView
	}
);
