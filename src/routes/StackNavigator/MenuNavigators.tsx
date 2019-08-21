import React, { Component } from 'react';
import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator
} from 'react-navigation';
import Home from '../../views/HomeView';
import Messages from '../../views/MessagesView';
import Collections from '../../views/CollectionsView';
import Header from '../../components/Header/Header';
import EventList from '../../components/ContentPage/Events/EventList';
import SurveyList from '../../components/ContentPage/Surveys/SurveyList';
import TopList from '../../components/ContentPage/Tops/TopList';
import SurveyNavigator from '../StackNavigator/SurveyNavigator';

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

export const Event_StackNavigator = createStackNavigator({
	Third: {
		screen: EventList,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Top_StackNavigator = createStackNavigator({
	Fourth: {
		screen: TopList,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Survey_StackNavigator = createStackNavigator({
	Fifth: {
		screen: SurveyNavigator,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});

export const Collections_StackNavigator = createStackNavigator({
	Sixth: {
		screen: Collections,
		navigationOptions: ({ navigation }) => ({
			header: Header
		})
	}
});
