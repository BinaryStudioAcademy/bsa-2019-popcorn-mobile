import React from 'react';
import {
	createBottomTabNavigator,
	createAppContainer,
	BottomTabBar
} from 'react-navigation';
import { Text } from 'react-native';
import EventList from '../../components/ContentPage/Events/EventList';
import TopList from '../../components/ContentPage/Tops/TopList';
import SurveyList from '../../components/ContentPage/Surveys/SurveyList';

import EventsNavigation from '../StackNavigator/EventsNavigator';
import SurveyNavigator from '../StackNavigator/SurveyNavigator';
import TopNavigation from '../StackNavigator/TopsNavigator';

import Header from '../../components/Header/Header';

const ContentPageNavigator = createBottomTabNavigator(
	{
		Events: {
			screen: EventsNavigation,
			navigationOptions: ({ navigation }) => ({
				header: Header
			})
		},
		Tops: {
			screen: TopNavigation,
			navigationOptions: ({ navigation }) => ({
				header: Header
			})
		},
		Surveys: {
			screen: SurveyNavigator,
			navigationOptions: ({ navigation }) => ({
				header: Header
			})
		}
	},
	{
		tabBarOptions: {
			activeTintColor: '#122737',
			labelStyle: {
				fontSize: 16,
				fontFamily: 'Inter-Bold'
			},
			tabStyle: {
				alignItems: 'center',
				justifyContent: 'center'
			},
			showIcon: false
		}
	}
);

export default createAppContainer(ContentPageNavigator);
