import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation';
import { Text } from 'react-native';
import EventList from '../../components/ContentPage/Events/EventList';
import TopList from '../../components/ContentPage/Tops/TopList';
import SurveyList from '../../components/ContentPage/Surveys/SurveyList';

const ContentPageNavigator = createBottomTabNavigator(
	{
		Events: {
			screen: EventList,
			tabBarLabel: () => <Text>Events</Text>
		},
		Tops: {
			screen: TopList,
			tabBarLabel: () => <Text>Tops</Text>
		},
		Surveys: {
			screen: SurveyList,
			tabBarLabel: () => <Text>Surveys</Text>
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

export default ContentPageNavigator;
