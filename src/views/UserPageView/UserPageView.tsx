import UserNavigator from '../../routes/TabNavigator/UserNavigator';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import PostComponent from '../../components/MainPage/Post';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import UserProfileView from './UserProfileView';
import TestView from './TestView';

interface IProps {
	match: {
		path: string;
		params: any;
	};
	getSelectedUserInfo: (id: string) => any;
	selectedProfileInfo: any;
}

class UserPageView extends Component<IProps> {
	constructor(props) {
		super(props);
	}

	render() {
		const { navigation } = this.props;
		return (
			// <ParallaxScrollView
			// 	backgroundColor="transparent"
			// 	contentBackgroundColor="transparent"
			// 	parallaxHeaderHeight={300}
			// 	// renderScrollComponent={() => <Animated.View />}
			// 	renderScrollComponent={() =>  <View> <Text>render scroll component me</Text></View>}
			// 	renderForeground={() => (
			// 	// <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			// 	<UserProfileView/>
			// 	// </View>
			// 	)}>
			// 	<ScrollView style={{ height: 500 }}>
			// 		<UserNavigator />
			// 	</ScrollView>
			// </ParallaxScrollView>
			// 	<ParallaxScrollView
			// 	backgroundColor="blue"
			// 	contentBackgroundColor="pink"
			// 	parallaxHeaderHeight={300}
			// 	renderForeground={() => (
			// 	 <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			// 		<Text>Hello World!</Text>
			// 	  </View>
			// 	)}>
			// 	<View style={{ height: 500 }}>
			// 	  <Text>Scroll me</Text>
			// 	</View>
			//   </ParallaxScrollView>

			<TestView />
		);
		// return <UserNavigator />;
	}
}

const mapStateToProps = (rootState, props) => ({
	selectedProfileInfo: rootState.authorization.profileInfo
});

export default connect(mapStateToProps)(UserPageView);
