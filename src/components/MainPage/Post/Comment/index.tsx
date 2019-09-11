import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IComment from './../IComment';
import config from '../../../../config';

interface IProps {
	comment: IComment;
}

const Comment = (props: IProps) => {
	const {
		text,
		user: { avatar, name }
	} = props.comment;
	return (
		<View style={styles.comment}>
			<Image
				style={styles.userAvatar}
				source={{ uri: avatar || config.DEFAULT_AVATAR }}
			/>
			<View style={styles.commentBody}>
				<Text style={styles.userName}>{name}</Text>
				<Text style={styles.commentText}>{text}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	comment: {
		flexDirection: 'row',
		marginVertical: 10
	},
	userAvatar: {
		width: 35,
		height: 35,
		borderRadius: 20,
		margin: 9,
		backgroundColor: '#adadad',
		marginHorizontal: 8
	},
	commentBody: {
		paddingVertical: 8,
		paddingHorizontal: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		borderRadius: 10,
		minWidth: 150
	},
	userName: {
		fontFamily: 'Inter-Bold',
		fontSize: 14,
		lineHeight: 17,
		letterSpacing: 0.4,
		color: 'rgba(18, 39, 55, 0.8)',
		marginVertical: 6
	},
	commentText: {
		fontFamily: 'Inter-regular',
		fontSize: 14,
		lineHeight: 17,
		letterSpacing: 0.4,
		color: 'rgba(18, 39, 55, 0.8)'
	}
});

export default Comment;
