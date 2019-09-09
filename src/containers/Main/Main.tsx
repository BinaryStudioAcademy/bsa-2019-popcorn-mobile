import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import SidebarView from '../../views/SidebarView';
import { HomeNavigator } from '../../routes/';
import firebase from 'react-native-firebase';
import { Storage } from '../../helpers/storage.helper';
import { sendDeviceToken } from '../../services/notification.service';

interface IProps {
	navigation: any;
}

class Main extends Component<IProps> {
	notificationListener: any;
	notificationOpenedListener: any;
	messageListener: any;

	async componentDidMount() {
		const channel = new firebase.notifications.Android.Channel(
			'insider',
			'insider channel',
			firebase.notifications.Android.Importance.Max
		);
		firebase.notifications().android.createChannel(channel);
		this.checkPermission();
		this.createNotificationListeners();
	}

	async getToken() {
		let fcmToken = await Storage.get('fcmToken');
		if (!fcmToken) {
			fcmToken = await firebase.messaging().getToken();
			if (fcmToken) {
				await sendDeviceToken(fcmToken);
				await Storage.set('fcmToken', fcmToken);
			}
		}
	}

	async checkPermission() {
		const enabled = await firebase.messaging().hasPermission();
		if (enabled) {
			this.getToken();
		} else {
			this.requestPermission();
		}
	}

	async requestPermission() {
		try {
			await firebase.messaging().requestPermission();
			this.getToken();
		} catch (error) {
			console.log('permission rejected');
		}
	}

	async createNotificationListeners() {
		firebase.notifications().onNotification(notification => {
			notification.android.setChannelId('insider').setSound('default');
			firebase.notifications().displayNotification(notification);
		});

		this.notificationOpenedListener = firebase
			.notifications()
			.onNotificationOpened(notificationOpen => {
				const { data } = notificationOpen.notification;
				if (data.type === 'post' || data.type === 'story')
					this.props.navigation.navigate('Main');
				if (data.type === 'event')
					this.props.navigation.navigate('Event', { eventId: data.id });
				if (data.type === 'message')
					this.props.navigation.navigate('Message', { chatId: data.id });
				if (data.type === 'follower') 
					this.props.navigation.navigate('Follower', { userId: data.id });
			});

		const notificationOpen = await firebase
			.notifications()
			.getInitialNotification();
		if (notificationOpen) {
			const { data } = notificationOpen.notification;
			if (data.type === 'post' || data.type === 'story')
				this.props.navigation.navigate('Main');
			if (data.type === 'event')
				this.props.navigation.navigate('Event', { eventId: data.id });
			if (data.type === 'message')
				this.props.navigation.navigate('Message', { chatId: data.id });
			if (data.type === 'follower') 
				this.props.navigation.navigate('Follower', { userId: data.id });
		}
	}

	render() {
		return (
			<Swiper loop={false} showsPagination={false} index={0}>
				<HomeNavigator screenProps={this.props.navigation}/>
				<SidebarView navigation={this.props.navigation} />
			</Swiper>
		);
	}
}

export default Main;
