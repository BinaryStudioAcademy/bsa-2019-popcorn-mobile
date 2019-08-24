import React, { Component } from 'react';
import {
	Dimensions,
	Image,
	FlatList,
	PixelRatio,
	StyleSheet,
	Text,
	View,
	Alert,
	ScrollView
} from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';
import UserProfileView from './UserProfileView';
import UserNavigator from '../../routes/TabNavigator/UserNavigator';

class Talks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				'Simplicity Matters',
				'Hammock Driven Development',
				'Value of Values',
				'Are We There Yet?',
				'The Language of the System',
				'Design, Composition, and Performance',
				'Clojure core.async',
				'The Functional Database',
				'Deconstructing the Database',
				'Hammock Driven Development',
				'Value of Values'
			]
		};
	}

	render() {
		const { onScroll = () => {} } = this.props;
		const data = [{ id: 1, data: 'Simplicity Matters' }];

		return (
			<ParallaxScrollView
				backgroundColor="#fff"
				contentBackgroundColor="#fff"
				parallaxHeaderHeight={300}
				renderForeground={() => (
					//  <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<UserProfileView />
					//   </View>
				)}
			>
				{/* <View style={{ height: 500 }}> */}
				{/* <ScrollView horizontal={true} style={{backgroundColor: 'pink'}}> */}
				<UserNavigator />
				{/* </ScrollView> */}
				{/* </View> */}
			</ParallaxScrollView>
		);
	}
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

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
	},
	stickySection: {
		height: STICKY_HEADER_HEIGHT,
		width: 300,
		justifyContent: 'flex-end'
	},
	stickySectionText: {
		color: 'white',
		fontSize: 20,
		margin: 10
	},
	fixedSection: {
		position: 'absolute',
		bottom: 10,
		right: 10
	},
	fixedSectionText: {
		color: '#999',
		fontSize: 20
	},
	parallaxHeader: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
		paddingTop: 100
	},
	avatar: {
		marginBottom: 10,
		borderRadius: AVATAR_SIZE / 2
	},
	sectionSpeakerText: {
		color: 'white',
		fontSize: 24,
		paddingVertical: 5
	},
	sectionTitleText: {
		color: 'white',
		fontSize: 18,
		paddingVertical: 5
	},
	row: {
		overflow: 'hidden',
		paddingHorizontal: 10,
		height: ROW_HEIGHT,
		backgroundColor: 'white',
		borderColor: '#ccc',
		borderBottomWidth: 1,
		justifyContent: 'center'
	},
	rowText: {
		fontSize: 20
	}
});

export default Talks;
