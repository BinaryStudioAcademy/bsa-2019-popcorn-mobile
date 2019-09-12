import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IComment from './../IComment';
import config from '../../../../config';
import NavigationService from '../../../../services/navigation.service';
import { StackActions, NavigationActions } from 'react-navigation';

interface IProps {
	comment: IComment;
	navigation: any;
	toggleModal: () => void;
	prevScreen: string;
}

const Comment = (props: IProps) => {
	const {
		text,
		user: { avatar, name },
		user
	} = props.comment;
	console.log('\n[Comment]props.prevScreen', props.prevScreen);
	console.log(
		'\n[COMMENT] this.props.navigation.state.routeName',
		props.navigation.state.routeName
	);
	const { prevScreen } = props;
	return (
		<View style={styles.comment}>
			<TouchableOpacity
				onPress={() => {
					props.toggleModal();
					const resetAction = StackActions.reset({
						index: 0,
						key: null,
						actions: [NavigationActions.navigate({ routeName: prevScreen })]
					});
					props.navigation.dispatch(resetAction);

					props.navigation.navigate({
						routeName: 'UserPage',
						params: {
							userId: user.id,
							name: 'UserPage'
						},
						key: 'UserPage' + Math.random() * 10000
					});
					props.navigation.navigate({
						routeName: 'Profile',
						params: {
							userId: user.id,
							name: 'UserPage'
						},
						key: Math.random() * 10000
					});
				}}
			>
				<Image
					style={styles.userAvatar}
					source={{ uri: avatar || config.DEFAULT_AVATAR }}
				/>
			</TouchableOpacity>
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
		minWidth: 150,
		maxWidth: 300
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
