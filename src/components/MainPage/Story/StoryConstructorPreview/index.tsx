import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import StoryModal from '../StoryModal';
import INewStory from '../INewStory';
import config from './../../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
interface IProps {
	navigation: any;
	user: any;
}

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
const StoryList = (props: IProps) => {
	const [showModal, onPress] = useState(false);
	const [newStory, setNewStory] = useState<NewStory>({
		newStory: newStoryDefault,
		data: null
	});
	const [disabled, handleDisable] = useState<boolean>(false);

	const { navigation } = props;
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
		<>
			{showModal ? <View style={styles.fadeModal}></View> : null}
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
			<TouchableOpacity
				style={styles.wrapper}
				onPress={() => onPress(!showModal)}
			>
				<View style={styles.constructorWrapper}>
					<Image
						style={styles.roundImagePreview}
						source={{ uri: props.user.avatar || config.DEFAULT_AVATAR }}
					/>
					<FontAwesomeIcon icon={faPlus} style={styles.plusIcon} size={38} />
				</View>
			</TouchableOpacity>
		</>
	);
};

const styles = StyleSheet.create({
	roundImagePreview: {
		width: 25,
		height: 25,
		borderRadius: 25,
		margin: 6
	},
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
	},
	wrapper: {
		marginHorizontal: 6,
		marginLeft: 75
	},
	constructorWrapper: {
		position: 'relative',
		height: 152,
		width: 100,
		backgroundColor: 'rgb(239, 239, 239)'
	},
	plusIcon: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -19,
		marginLeft: -19,
		color: 'rgba(0, 0, 0, 0.15)'
	}
});

export default StoryList;
