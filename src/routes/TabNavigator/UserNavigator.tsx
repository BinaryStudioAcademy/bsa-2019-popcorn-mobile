import React, { Component } from 'react';
import {
	createAppContainer,
	createMaterialTopTabNavigator
} from 'react-navigation';

import {
	Surveys,
	Events,
	Lists,
	Watched,
	Reviews,
	Tops
} from '../../views/UserPageView/UserPageViews';
import UserPosts from '../../views/UserPageView/UserPostsView';

const UserNavigator = createMaterialTopTabNavigator(
	{
		Tops: {
			screen: Tops
		},
		Reviews: {
			screen: Reviews
		},
		Events: {
			screen: Events
		},
		Surveys: {
			screen: Surveys
		},
		Posts: {
			screen: UserPosts
		},
		Lists: {
			screen: Lists
		},
		Watched: {
			screen: Watched
		}
	},
	{
		tabBarPosition: 'top',
		tabBarOptions: {
			scrollEnabled: true,
			activeTintColor: '#fff',
			activeBackgroundColor: '#FF9800',
			inactiveTintColor: '#666',
			pressColor: '#000',
			labelStyle: {
				color: '#000',
				fontSize: 14,
				fontFamily: 'Inter-Bold'
			},
			tabStyle: {
				width: 110,
				alignItems: 'center',
				justifyContent: 'center'
			},
			style: {
				backgroundColor: 'transparent'
			},
			showIcon: false,
			indicatorStyle: {
				width: 0
			}
		}
	}
);

export default createAppContainer(UserNavigator);
