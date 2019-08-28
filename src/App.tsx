import React from 'react';
import Root from './containers/Root/root';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

class App extends React.Component {
	notificationListener: any;
	notificationOpenedListener: any;
	messageListener: any;
	async getToken() {
		let fcmToken = await AsyncStorage.getItem('fcmToken');
		if (!fcmToken) {
			fcmToken = await firebase.messaging().getToken();
			if (fcmToken) {
				await AsyncStorage.setItem('fcmToken', fcmToken);
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
			notification.android.setChannelId('insider').setSound('default')
			firebase.notifications().displayNotification(notification)
		});
	}
	
	componentDidMount() {
		const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
		firebase.notifications().android.createChannel(channel);
		this.checkPermission();
		this.createNotificationListeners();
	}

	render() {
		return (
			<PersistGate loading={null} persistor={persistor}>
				<Root store={store} />
			</PersistGate>
		);
	}
}

export default App;
