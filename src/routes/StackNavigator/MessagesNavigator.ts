import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Header from '../../components/Header/Header';
import Messages from '../../views/Messages/Messages';
import Chats from '../../views/Messages/';
import UserProfileNavigator from './UserProfileNavigator';

const MessagesNavigator = createStackNavigator({
	Second: {
		screen: Chats,
		navigationOptions: ({ navigation }) => ({
			header: Header,
			navigation
		})
	},
	Messages: {
		screen: Messages,
		navigationOptions: ({ navigation }) => ({
			header: Header,
			navigation
		})
	},
	UserProfile: {
		screen: UserProfileNavigator,
		navigationOptions: ({ navigation }) => ({
			header: Header,
			navigation
		})
	}
});

export default MessagesNavigator;
