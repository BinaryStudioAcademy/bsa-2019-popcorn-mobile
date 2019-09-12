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


const StoryList = (props: IProps) => {
	const { navigation } = props;

	return (
		<>	
			<TouchableOpacity
				style={styles.wrapper}
				onPress={() => navigation.navigate('StoryConstructor')}
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
