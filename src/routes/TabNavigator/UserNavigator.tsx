import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';

import MessagesView from '../../views/MessagesView';
import HomeView from '../../views/HomeView';

import PopcornIcon from '../../assets/general/User.png';

Navigation.registerComponent('MessagesView', () => MessagesView);
Navigation.registerComponent('HomeView', () => HomeView);
import {
	createBottomTabNavigator,
	BottomTabBar,
	createAppContainer
} from 'react-navigation';

import { View, Text } from 'react-native';

class Page1 extends Component {
	render() {
		return (
			<View>
				<Text>Page 1</Text>
				<Text>Page 1</Text>
				<Text>Page 1</Text>
				<Text>Page 1</Text>
				<Text>Page 1</Text>
			</View>
		);
	}
}

class Page2 extends Component {
	render() {
		return (
			<View>
				<Text>Page 2</Text>
				<Text>Page 2</Text>
				<Text>Page 2</Text>
				<Text>Page 2</Text>
				<Text>Page 2</Text>
				<Text>Page 2</Text>
			</View>
		);
	}
}
class Page3 extends Component {
	render() {
		return (
			<View>
				<Text>Page 3</Text>
				<Text>Page 3</Text>
				<Text>Page 3</Text>
				<Text>Page 3</Text>
				<Text>Page 3</Text>
			</View>
		);
	}
}
const TabApp = createBottomTabNavigator(
	{
		Page1: {
			screen: Page1
		},
		Page2: {
			screen: Page2
		},
		Page3: {
			screen: Page3
		}
	},
	{
		tabBarPosition: 'bottom',
		swipeEnabled: true,
		tabBarOptions: {
			activeTintColor: '#f2f2f2',
			activeBackgroundColor: '#2EC4B6',
			inactiveTintColor: '#666',
			labelStyle: {
				fontSize: 22,
				padding: 12
			}
		}
	}
);
export default createAppContainer(TabApp);
