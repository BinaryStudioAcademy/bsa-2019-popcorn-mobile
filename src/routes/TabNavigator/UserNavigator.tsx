import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';

import MessagesView from '../../views/MessagesView';
import HomeView from '../../views/HomeView';
import UserProfileView from '../../views/UserPageView/UserProfileVIew.tsx';

import {
	createBottomTabNavigator,
	BottomTabBar,
	createAppContainer
} from 'react-navigation';

import { View, Text } from 'react-native';

class Posts extends Component {
	render() {
		return (
			<View>
				<Text>Posts</Text>
			</View>
		);
	}
}

class Content extends Component {
	render() {
		return (
			<View>
				<Text>Content</Text>
			</View>
		);
	}
}

class Lists extends Component {
	render() {
		return (
			<View>
				<Text>Lists</Text>
			</View>
		);
	}
}
class Watched extends Component {
	render() {
		return (
			<View>
				<Text>Watched</Text>
			</View>
		);
	}
}

const UserNavigator = createBottomTabNavigator(
	{
		Profile: {
			screen: UserProfileView
		},
		Content: {
			screen: Content
		},
		Posts: {
			screen: Posts
		},
		Lists: {
			screen: Lists
		},
		Watched: {
			screen: Watched
		}
	},
	{
		tabBarPosition: 'bottom',
		swipeEnabled: true,
		tabBarOptions: {
			activeTintColor: '#fff',
			activeBackgroundColor: '#FF9800',
			inactiveTintColor: '#666',
			style: {
				alignItems: 'center',
				borderTopColor: '#fff'
			},
			labelStyle: {
				fontSize: 14,
				padding: 12
			}
		}
	}
);
export default createAppContainer(UserNavigator);
