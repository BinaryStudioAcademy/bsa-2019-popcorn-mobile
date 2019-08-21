import React, { Component } from 'react';
import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator
} from 'react-navigation';
import Home from '../../views/HomeView';
import Messages from '../../views/MessagesView';
import Collections from '../../views/CollectionsView';
import EventList from '../../components/ContentPage/Events/EventList';
import SurveyList from '../../components/ContentPage/Surveys/SurveyList';
import TopList from '../../components/ContentPage/Tops/TopList';

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

export const Event_StackNavigator = createStackNavigator({
	Third: {
		screen: EventList,
		navigationOptions: ({ navigation }) => ({
			title: 'Events',
			headerStyle: {
				backgroundColor: '#FF9800'
			},
			headerTintColor: '#fff'
		})
	}
});

export const Top_StackNavigator = createStackNavigator({
	Fourth: {
		screen: TopList,
		navigationOptions: ({ navigation }) => ({
			title: 'Tops',
			headerStyle: {
				backgroundColor: '#FF9800'
			},
			headerTintColor: '#fff'
		})
	}
});

export const Survey_StackNavigator = createStackNavigator({
	Fifth: {
		screen: SurveyList,
		navigationOptions: ({ navigation }) => ({
			title: 'Surveys',
			headerStyle: {
				backgroundColor: '#FF9800'
			},
			headerTintColor: '#fff'
		})
	}
});

export const Collections_StackNavigator = createStackNavigator({
	Sixth: {
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
