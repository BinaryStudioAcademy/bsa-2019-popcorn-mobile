import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import PostCompomonent from './../components/MainPage/Post/';
import StoryComponent from './../components/MainPage/Story/';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StoryModal from '../components/MainPage/Story/StoryModal';

const newStoryDefault = {
	image_url: null,
	caption: null,
	activity: null,
	type: ''
};

const HomeView = ({ navigation }) => {
	const [showModal, onPress] = useState(false);
	const [newStory, setNewStory] = useState(newStoryDefault);

	console.warn(newStory);
	return (
		<View style={{ flex: 1 }}>
			<TouchableOpacity
				style={styles.modalAnchor}
				onPress={() => onPress(!showModal)}
			>
				<Text style={styles.addStoryView}>Add story</Text>
			</TouchableOpacity>
			<View style={styles.modal}>
				{showModal && (
					<StoryModal
						navigation={navigation}
						newStory={newStory}
						setNewStory={setNewStory}
					/>
				)}
			</View>
			<ParallaxScrollView
				parallaxHeaderHeight={280}
				backgroundColor="#FFFFFF"
				contentBackgroundColor="#FFFFFF"
				renderForeground={() => (
					<View style={{ marginVertical: 20 }}>
						<StoryComponent navigation={navigation} />
					</View>
				)}
			>
				<View style={{ flex: 1 }}>
					<PostCompomonent />
				</View>
			</ParallaxScrollView>
		</View>
	);
};

export default HomeView;
