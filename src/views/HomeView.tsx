import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import PostCompomonent from './../components/MainPage/Post/';
import StoryComponent from './../components/MainPage/Story/';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StoryModal from '../components/MainPage/Story/StoryModal';
import INewStory from '../components/MainPage/Story/INewStory';

const mock_url =
	'https://i.pinimg.com/736x/2c/f1/93/2cf193ee4bef23eb1a2a9b07faadd951.jpg';

const newStoryDefault: INewStory = {
	activityId: '',
	backgroundColor: 'rgba(255,255,255, 0)', // white
	fontColor: 'rgba(0,0,0,0)', // black
	movieId: null,
	movieOption: '',
	image_url: mock_url,
	caption: null,
	activity: null,
	type: ''
};
type NewStory = {
	newStory: INewStory;
	data: any;
};

const HomeView = ({ navigation }) => {
	const [showModal, onPress] = useState(false);
	const [newStory, setNewStory] = useState<NewStory>({
		newStory: newStoryDefault,
		data: null
	});

	if (navigation.state.params) {
		const { option, type } = navigation.state.params;
		navigation.state.params = null;
		if (!newStory.data || newStory.data.id !== option.id)
			setNewStory({ newStory: newStory.newStory, data: { option, type } });
	}

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
						newStory={newStory.newStory}
						setNewStory={setNewStory}
						data={newStory.data}
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
