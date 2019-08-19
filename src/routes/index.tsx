import { createAppContainer, createStackNavigator } from 'react-navigation';
import { RightDrawer } from './RightDrawer';
import LeftDrawer from './LeftDrawer';

export const NavStack = createStackNavigator({
	RightDrawer: {
		screen: RightDrawer
	},
	LeftDrawer: {
		screen: LeftDrawer
	}
});

export default createAppContainer(NavStack);
