import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import PostComponent from './../components/MainPage/Post/';
import StoryComponent from './../components/MainPage/Story/';

const HomeView = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<ParallaxScrollView
				parallaxHeaderHeight={210}
				backgroundColor="#FFFFFF"
				contentBackgroundColor="#FFFFFF"
				renderForeground={() => (
					<View style={{ marginTop: 20, marginBottom: 10 }}>
						<StoryComponent navigation={navigation} />
					</View>
				)}
			>
				<View style={{ flex: 1 }}>
					<PostComponent navigation={navigation} />
				</View>
			</ParallaxScrollView>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		flex: 1
	}
});
export default HomeView;
