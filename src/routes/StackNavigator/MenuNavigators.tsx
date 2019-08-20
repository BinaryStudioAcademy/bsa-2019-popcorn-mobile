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
import Header from '../../components/Header/Header';

export const FirstActivity_StackNavigator = createStackNavigator({
	First: {
		screen: Home,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Messages_StackNavigator = createStackNavigator({
	Second: {
		screen: Messages,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Content_StackNavigator = createStackNavigator({
	Third: {
		screen: ContentPageNavigator,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Collections_StackNavigator = createStackNavigator({
	Fourth: {
		screen: Collections,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});
