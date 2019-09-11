import React from 'react';
import { TouchableOpacity } from 'react-native';
import INewStory from '../INewStory';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from './styles';

interface ITextButtonProps {
	newStory: INewStory;
	handleUpdateState: (any, string) => any;
	showInput: boolean;
}

const TextButton = (props: ITextButtonProps) => {
	const { newStory, handleUpdateState, showInput } = props;
	return (
		<TouchableOpacity
			onPress={() => {
				handleUpdateState(null, 'voting');
				handleUpdateState(false, 'showVoting');
				handleUpdateState(newStory.caption ? true : !showInput, 'showInput');
			}}
		>
			<Fontisto name="font" style={styles.shadow} color={'#fff'} size={30} />
		</TouchableOpacity>
	);
};

export default TextButton;
