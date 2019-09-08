import React, { Component } from 'react';
import { Text, View } from 'react-native';
import WatchlistComponent from './../../components/UserPage/WatchList';
import CollectionsList from '../../components/Collections/CollectionsList';

export class Tops extends Component {
	render() {
		return <View></View>;
	}
}
export class UserPosts extends Component {
	render() {
		return <View></View>;
	}
}
export class Surveys extends Component {
	render() {
		return <View></View>;
	}
}
export class Lists extends Component<{ navigation: any }> {
	render() {
		return (
			<View>
				<CollectionsList navigation={this.props.navigation} />
			</View>
		);
	}
}
export class Watched extends Component {
	render() {
		return (
			<View>
				<View></View>
				<WatchlistComponent />
			</View>
		);
	}
}
export class Reviews extends Component {
	render() {
		return <View></View>;
	}
}
export class Events extends Component {
	render() {
		return <View></View>;
	}
}
