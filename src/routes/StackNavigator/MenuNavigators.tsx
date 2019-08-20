import React, { Component } from 'react';
import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator
} from 'react-navigation';
import Home from '../../views/HomeView';
import Messages from '../../views/MessagesView';
import ContentPageNavigator from '../TabNavigator/ContentPageNavigator';
import Collections from '../../views/CollectionsView';

export const FirstActivity_StackNavigator = createStackNavigator({
	First: {
		screen: Home,
		navigationOptions: ({ navigation }) => ({
			title: 'Home',
			headerStyle: {
				backgroundColor: '#FF9800'
			},
			headerTintColor: '#fff'
		})
	}
});

export const Messages_StackNavigator = createStackNavigator({
	Second: {
		screen: Messages,
		navigationOptions: ({ navigation }) => ({
			title: 'Messages',
			headerStyle: {
				backgroundColor: '#FF9800'
			},
			headerTintColor: '#fff'
		})
	}
});

export const Content_StackNavigator = createStackNavigator({
	Third: {
		screen: ContentPageNavigator,
		navigationOptions: ({ navigation }) => ({
			title: 'Content',
			headerStyle: {
				backgroundColor: '#FF9800'
			},
			headerTintColor: '#fff'
		})
	}
});

export const Collections_StackNavigator = createStackNavigator({
	Fourth: {
		screen: Collections,
		navigationOptions: ({ navigation }) => ({
			title: 'Collections',
			headerStyle: {
				backgroundColor: '#FF9800'
			},
			headerTintColor: '#fff'
		})
	}
});
