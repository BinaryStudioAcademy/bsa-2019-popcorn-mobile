import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import PostComponent from './../components/MainPage/Post/';
import StoryComponent from './../components/MainPage/Story/';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StoryModal from '../components/MainPage/Story/StoryModal';
import INewStory from '../components/MainPage/Story/INewStory';
import config from '../config';

const newStoryDefault: INewStory = {
	activityId: '',
	backgroundColor: '#dadada',
	fontColor: '#000',
	movieId: null,
	movieOption: '',
	image_url: '',
	caption: null,
	activity: null,
	textPositionX: 0,
	textPositionY: 0,
	type: ''
};
type NewStory = {
	newStory: INewStory;
	data: any;
};

const validateStory = ({ caption, newStory, data, voting, handleDisable }) => {
	caption = caption === undefined ? newStory.caption : caption;
	const { image_url, backgroundColor } = newStory;
	if (
		(caption && caption.match(/^(?!\s*$).*/) && image_url) ||
		(caption && caption.match(/^(?!\s*$).*/) && backgroundColor) ||
		(data && image_url) ||
		voting
	) {
		handleDisable(false);
	} else {
		handleDisable(true);
	}
};

const getDefaultImage = type => {
	switch (type) {
		case 'event':
			return config.DEFAULT_EVENT_IMAGE;
		case 'survey':
			return config.DEFAULT_SURVEY_IMAGE;
		case 'top':
			return config.DEFAULT_TOP_IMAGE;
		default:
			return '';
	}
};

const HomeView = ({ navigation }) => {
	const [showModal, onPress] = useState(false);
	const [newStory, setNewStory] = useState<NewStory>({
		newStory: newStoryDefault,
		data: null
	});
	const [disabled, handleDisable] = useState<boolean>(false);

	if (navigation.state.params) {
		const { option, type } = navigation.state.params;
		navigation.state.params = null;
		if (!newStory.data || newStory.data.id !== option.id) {
			let extraImage = getDefaultImage(type);
			setNewStory({
				newStory: {
					...newStory.newStory,
					image_url: option.image ? option.image : extraImage,
					caption: ''
				},
				data: { option, type }
			});
		}
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
						handleDisable={handleDisable}
						disabled={disabled}
						validateStory={validateStory}
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
	},
	addStoryView: {
		fontWeight: '600',
		textTransform: 'uppercase',
		padding: 8,
		backgroundColor: '#fb8c00',
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
		marginRight: 'auto'
	},
	modalAnchorBack: {
		zIndex: 6,
		position: 'relative',
		top: 0
	},
	modal: {
		position: 'absolute',
		bottom: 10,
		zIndex: 6,
		width: '90%',
		height: '95%'
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
