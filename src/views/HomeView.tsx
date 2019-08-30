import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import styles from '../assets/style';
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
	backgroundColor: '#adadad', // grey
	fontColor: '#000', // black
	movieId: null,
	movieOption: '',
	image_url: '',
	// image_url: '',
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
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.modalAnchor}
				onPress={() => onPress(!showModal)}
			>
				<Text style={styles.addStoryView}>Add story</Text>
			</TouchableOpacity>
			{showModal && (
				<View style={styles.modal}>
					<StoryModal
						navigation={navigation}
						newStory={newStory.newStory}
						setNewStory={setNewStory}
						data={newStory.data}
					/>
				</View>
			)}
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
const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	addStoryView: {
		padding: '2%',
		backgroundColor: '#FF6501',
		borderRadius: 5,
		textAlign: 'center',
		fontSize: 15,
		color: 'white',
		fontFamily: 'Inter-SemiBold',
		marginBottom: 20,
		marginTop: 20
	},
	modalAnchor: {
		position: 'relative',
		width: 130
	},
	modal: {
		position: 'absolute',
		top: 60,
		backgroundColor: '#e4e4e4',
		zIndex: 5
	}
});
export default HomeView;
