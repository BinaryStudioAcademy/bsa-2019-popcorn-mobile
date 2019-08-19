import {
	DrawerActions,
	createAppContainer,
	createDrawerNavigator,
	createStackNavigator,
	createBottomTabNavigator
} from 'react-navigation';
import MessagesView from '../views/MessagesView';
import EventsView from '../views/EventsView';
import CollectionsView from '../views/CollectionsView';
import HomeView from '../views/HomeView';

const LeftDrawer = createDrawerNavigator(
	{
		LeftDrawer: createDrawerNavigator({
			Home: {
				screen: HomeView
			},
			Messages: {
				screen: MessagesView
			},
			Events: {
				screen: EventsView
			},
			Collections: {
				screen: CollectionsView
			}
		})
	},
	{
		getCustomActionCreators: (route, stateKey) => {
			return {
				toggleLeftDrawer: () =>
					DrawerActions.toggleDrawer({
						key: stateKey
					})
			};
		},
		drawerPosition: 'left'
	}
);

export default LeftDrawer;
