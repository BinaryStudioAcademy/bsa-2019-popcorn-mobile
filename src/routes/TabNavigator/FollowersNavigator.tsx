import React, { Component } from 'react';
import {
	createMaterialTopTabNavigator
} from 'react-navigation';
import { Text, Dimensions } from 'react-native'

import FollowedList from '../../components/Followers/FollowedList';
import FollowersList from '../../components/Followers/FollowersList';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FollowersNavigator = createMaterialTopTabNavigator(
	{
		Followers: {
            screen: FollowersList
 		},
		Following: {
            screen: FollowedList
		}
	},
	{
		tabBarPosition: 'top',
		tabBarOptions: {
			scrollEnabled: true,
			activeTintColor: '#fff',
			activeBackgroundColor: '#FF9800',
			inactiveTintColor: '#666',
			labelStyle: {
				color: '#122737',
				fontSize: 16,
                fontFamily: 'Inter-SemiBold',
                letterSpacing: 0.4
			},
			tabStyle: {
				width: SCREEN_WIDTH/2,
				alignItems: 'center',
				justifyContent: 'center',
				borderBottomColor: 'rgba(0, 0, 0, 0.1)',
				borderBottomWidth: 1
			},
			style: {
				backgroundColor: 'transparent',
			},
			showIcon: false,
			indicatorStyle: {
				backgroundColor: '#ff6501'
            },
            upperCaseLabel: false
		}
	}
);

export default FollowersNavigator;