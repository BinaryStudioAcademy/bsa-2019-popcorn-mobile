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
			<FlatList
				ref="FlatList"
				style={styles.container}
				data={data}
				renderItem={() => {
					// Alert.alert('item=', item);

					return (
						<ScrollView horizontal={true}>
							<UserNavigator />
						</ScrollView>
						// <View style={ styles.row }>
						//   <Text style={ styles.rowText }>
						// 			{item.item.data}
						//   </Text>
						// </View>
					);
				}}
				renderScrollComponent={props => (
					<ParallaxScrollView
						onScroll={onScroll}
						headerBackgroundColor="#fff"
						stickyHeaderHeight={STICKY_HEADER_HEIGHT}
						parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
						backgroundSpeed={10}
						backgroundColor="#fff"
						// renderBackground={() => (
						//   <View key="background">
						//     <Image source={{uri: 'https://simpleveganblog.com/wp-content/uploads/2018/10/Vegan-popcorn.jpg',
						//                     width: window.width,
						//                     height: PARALLAX_HEADER_HEIGHT}}/>
						//     <View style={{position: 'absolute',
						//                   top: 0,
						//                   width: window.width,
						//                   backgroundColor: 'rgba(0,0,0,0)',
						//                   height: PARALLAX_HEADER_HEIGHT}}/>
						//   </View>
						// )}

						renderForeground={() => (
							//   <View key="parallax-header" style={ styles.parallaxHeader }>
							//     <Image style={ styles.avatar } source={{
							//       uri: 'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
							//       width: AVATAR_SIZE,
							//       height: AVATAR_SIZE
							//     }}/>
							//     <Text style={ styles.sectionSpeakerText }>
							//       Talks by Rich Hickey
							//     </Text>
							//     <Text style={ styles.sectionTitleText }>
							//       CTO of Cognitec, Creator of Clojure
							//     </Text>
							//   </View>

							<UserProfileView />
						)}

						// renderStickyHeader={() => (
						//   <View key="sticky-header" style={styles.stickySection}>
						//     <Text style={styles.stickySectionText}>My Profile Name</Text>
						//   </View>
						// )}

						// renderFixedHeader={() => (
						//   <View key="fixed-header" style={styles.fixedSection}>
						//     <Text style={styles.fixedSectionText}
						//           onPress={() => this.refs.FlatList.scrollToOffset({ x: 0, y: 0 })}>
						//       Scroll to top
						//     </Text>
						//   </View>
						// )}
					/>
				)}
			/>
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
