import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import styles from '../assets/style';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import PostComponent from './../components/MainPage/Post/';
import StoryComponent from './../components/MainPage/Story/';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StoryModal from '../components/MainPage/Story/StoryModal';
import INewStory from '../components/MainPage/Story/INewStory';

const mock_url =
	'https://i.pinimg.com/736x/2c/f1/93/2cf193ee4bef23eb1a2a9b07faadd951.jpg';

const newStoryDefault: INewStory = {
	activityId: '',
	backgroundColor: '#dadada', // grey
	fontColor: '#000', // black
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
		<View style={styles.container}>
			{showModal ? <View style={styles.fadeModal}></View> : null}
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
						showModal={onPress}
					/>
					<TouchableOpacity
						style={styles.modalAnchor}
						onPress={() => onPress(!showModal)}
					>
						<Text style={styles.addStoryView}>Close editor</Text>
					</TouchableOpacity>
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
					<PostComponent />
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
		fontWeight: '600',
		textTransform: 'uppercase',
		padding: 8,
		backgroundColor: '#ffab07',
		borderRadius: 5,
		textAlign: 'center',
		fontSize: 15,
		color: 'white',
		fontFamily: 'Inter-SemiBold',
		marginBottom: 20,
		marginTop: 20
	},
	modalAnchor: {
		zIndex: 6,
		width: 140,
		marginLeft: 'auto',
		marginRight: 'auto',
		position: 'relative'
	},
	modal: {
		position: 'absolute',
		top: 60,
		zIndex: 6,
		width: '80%',
		height: '80%'
	},
	fadeModal: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)',
		zIndex: 5
	}
});
export default HomeView;
