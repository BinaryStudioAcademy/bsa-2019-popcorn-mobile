import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import {
	Collections_StackNavigator,
	Movies_StackNavigator,
	Notifications_Navigator,
	UserPage_StackNavigator,
	FirstActivity_StackNavigator
} from './MenuNavigators';
import StoryComponent from './../../components/MainPage/Story/StoryCarousel/StoryCarousel';
import PostConstructorNavigator from './PostConstructorNavigator';
import LogoutDrawer from '../../components/Authorization/Logout/LogoutDrawer';
import MessagesNavigator from './MessagesNavigator';
import Header from '../../components/Header/Header';

const HomeNavigator = createDrawerNavigator(
	{
		Home: {
			screen: FirstActivity_StackNavigator,
			navigationOptions: {
				drawerLabel: 'Home'
			}
		},
		Profile: {
			screen: UserPage_StackNavigator,
			navigationOptions: {
				drawerLabel: 'My profile'
			}
		},
		Messages: {
			screen: MessagesNavigator,
			navigationOptions: ({ navigation }) => ({
				drawerLabel: 'Messages',
				header: Header,
				navigation
			})
		},
		Collections: {
			screen: Collections_StackNavigator,
			navigationOptions: {
				drawerLabel: 'Collections'
			}
		},
		Movies: {
			screen: Movies_StackNavigator,
			navigationOptions: {
				drawerLabel: 'Movies'
			}
		},
		Story: {
			screen: StoryComponent,
			navigationOptions: {
				header: null,
				drawerLabel: () => null
			}
		},

		Notifications: {
			screen: Notifications_Navigator,
			navigationOptions: {
				drawerLabel: () => null
			}
		},
		PostConstructor: {
			screen: PostConstructorNavigator,
			navigationOptions: {
				drawerLabel: () => null
			}
		},
		UserPage: {
			screen: UserPage_StackNavigator,
			navigationOptions: {
				drawerLabel: () => null
			}
		}
	},
	{
		contentComponent: props => <LogoutDrawer {...props} />,
		contentOptions: {
			activeTintColor: '#fb8700'
		}
	}
);

export default createAppContainer(HomeNavigator);
