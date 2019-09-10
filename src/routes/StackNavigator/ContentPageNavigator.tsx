import React from 'react';
import {
	createAppContainer,
	createStackNavigator,
	createSwitchNavigator
} from 'react-navigation';

import {
	Event_StackNavigator,
	Survey_StackNavigator,
	Top_StackNavigator
} from '../StackNavigator/MenuNavigators';

const ContentPageNavigator = createSwitchNavigator({
	Events: {
		screen: Event_StackNavigator,
		header: null
	},

	Tops: {
		screen: Top_StackNavigator,
		header: null
	},

	Surveys: {
		screen: Survey_StackNavigator,
		header: null
	}
});

export default createAppContainer(ContentPageNavigator);
