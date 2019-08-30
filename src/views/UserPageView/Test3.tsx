import React, { Component } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import UserProfileView from './UserProfileView';
import UserNavigator from '../../routes/TabNavigator/UserNavigator';

const window = Dimensions.get('window');

const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

class UserPageViewTest3 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const data = [{ id: 1, data: '' }];

		return (
			<FlatList
				ref="FlatList"
				style={styles.container}
				data={data}
				renderItem={() => {
					return <UserNavigator />;
				}}
				renderScrollComponent={props => (
					<ParallaxScrollView
						headerBackgroundColor="#fff"
						stickyHeaderHeight={STICKY_HEADER_HEIGHT}
						parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
						backgroundSpeed={10}
						backgroundColor="#fff"
						renderForeground={() => <UserProfileView />}
					/>
				)}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: window.width,
		height: PARALLAX_HEADER_HEIGHT
	}
});

export default UserPageViewTest3;
