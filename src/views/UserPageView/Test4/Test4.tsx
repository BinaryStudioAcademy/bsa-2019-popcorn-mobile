import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import {
	createMaterialTopTabNavigator,
	createAppContainer
} from 'react-navigation';
import UserProfileView from '../UserProfileView';
import Tops from './UserTopsWrap';
import Events from './UserEventsWrap';
import Surveys from './UserSurveysWrap';
import Reviews from './UserReviewsWrap';
import Lists from './UserListsWrap';
import Watched from './UserWatchedWrap';
import UserPosts from '../UserPostsView';

const HEADER_HEIGHT = 300;
const TabView = createMaterialTopTabNavigator(
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
const component = {
	MyTab: createAppContainer(TabView)
};
const MyTabComponent = component['MyTab'];

export default class Home extends Component {
	offset: Animated.Value = new Animated.Value(0);
	static router = MyTabComponent.router;

	render() {
		const translateY = this.offset.interpolate({
			inputRange: [0, HEADER_HEIGHT],
			outputRange: [0, -HEADER_HEIGHT],
			extrapolate: 'clamp'
		});
		return (
			<View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
				<Animated.View
					style={[
						{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							overflow: 'hidden',
							height: HEADER_HEIGHT
						},
						{ transform: [{ translateY }] }
					]}
				>
					<UserProfileView />
				</Animated.View>
				<Animated.View
					style={[
						{
							marginTop: HEADER_HEIGHT,
							flex: 1,
							marginBottom: -HEADER_HEIGHT
						},
						{ transform: [{ translateY }] }
					]}
				>
					<MyTabComponent
						screenProps={{ scrollY: this.offset }}
						style={{ backgroundColor: 'red' }}
					/>
				</Animated.View>
			</View>
		);
	}
}
