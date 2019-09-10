import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { getIcon } from './../../../../services/postReaction.service';
interface IProps {
	postId: string;
	userId: string;
	reactPost: (type: string, userId: string, postId: string) => any;
	toggleModal: () => any;
}

const reactions = [
	{
		id: 1,
		reactionType: 'like'
	},
	{
		id: 2,
		reactionType: 'dislike'
	},
	{
		id: 3,
		reactionType: 'popcorn'
	},
	{
		id: 4,
		reactionType: 'haha'
	},
	{
		id: 5,
		reactionType: 'wow'
	},
	{
		id: 6,
		reactionType: 'sad'
	},
	{
		id: 7,
		reactionType: 'angry'
	}
];

const PostReactions = (props: IProps) => {
	const renderReactions = (item, userId, postId) => {
		return (
			<TouchableOpacity
				key={item.id}
				onPress={() => (
					props.reactPost(item.reactionType, userId, postId),
					props.toggleModal()
				)}
			>
				<View style={styles.reactionWrapper}>
					{getIcon(item.reactionType, 30)}
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.modal}>
			{reactions.map(item => renderReactions(item, props.userId, props.postId))}
		</View>
	);
};

const styles = StyleSheet.create({
	modal: {
		position: 'absolute',
		zIndex: 10,
		backgroundColor: 'rgb(255, 255, 255)',
		bottom: 30,
		width: 280,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		flexDirection: 'row',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5
	},
	reactionWrapper: {
		margin: 5
	}
});

export default PostReactions;
