import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { getIcon } from './../../services/postReaction.service';

interface IProps {
	message: any;
	isOwn: boolean;
}

export const ReactionMessage: React.FC<IProps> = ({ message, isOwn }) => {
	const { reactionType, story, body } = message;
	return (
		<View
			style={
				!isOwn ? styles.reactionMessageWrap : styles.ownReactionMessageWrap
			}
		>
			<Text style={!isOwn ? styles.reactionReply : styles.ownReactionReply}>
				{isOwn ? 'Reacted to story' : 'Reacted to your story'}
			</Text>
			<View
				style={!isOwn ? styles.reactionStoryWrap : styles.ownReactionStoryWrap}
			>
				<View
					style={[
						isOwn ? styles.reactionStory : styles.ownReactionStory,
						{ backgroundColor: story.backgroundColor }
					]}
				>
					<Image
						source={{ uri: story.image_url }}
						style={!isOwn ? styles.reactionImage : styles.ownReactionImage}
					/>
					<Text
						style={[
							isOwn ? styles.reactionText : styles.ownReactionText,
							{
								left: story.textPositionX,
								top: story.textPositionY,
								color: story.fontColor
							}
						]}
					>
						{story.caption}
					</Text>
				</View>
				{reactionType && (
					<View style={!isOwn ? styles.reactionEmoji : styles.ownReactionEmoji}>
						{getIcon(reactionType, 70, 73)}
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	reactionEmoji: {
		fontSize: 60,
		position: 'absolute',
		bottom: 0,
		right: 10
	},
	reactionMessageWrap: {
		paddingLeft: 20,
		borderLeftColor: '#dadada',
		borderLeftWidth: 4,
		marginTop: 10,
		marginBottom: 10,
		justifyContent: 'space-between',
		width: 220,
		height: 230
	},
	reactionImage: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		borderRadius: 20
	},
	reactionStory: {
		position: 'relative',
		height: 200,
		width: 150,
		borderRadius: 20
	},
	reactionStoryWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	reactionReply: {
		color: '#555',
		fontFamily: 'Inter-Regular',
		letterSpacing: 0.4,
		marginBottom: 12,
		fontWeight: '300'
	},
	reactionText: {
		fontSize: 16,
		padding: 5,
		position: 'absolute'
	},

	ownReactionEmoji: {
		fontSize: 60,
		position: 'absolute',
		bottom: 0,
		left: 10
	},
	ownReactionMessageWrap: {
		alignSelf: 'flex-end',
		paddingRight: 20,
		borderRightColor: '#dadada',
		borderRightWidth: 4,
		marginTop: 10,
		marginBottom: 10,
		justifyContent: 'space-between',
		width: 220,
		height: 230
	},
	ownReactionImage: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		borderRadius: 20
	},
	ownReactionStory: {
		position: 'relative',
		height: 200,
		width: 150,
		borderRadius: 20
	},
	ownReactionStoryWrap: {
		alignItems: 'flex-end'
	},
	ownReactionReply: {
		color: '#555',
		fontFamily: 'Inter-Regular',
		letterSpacing: 0.4,
		marginBottom: 12,
		fontWeight: '300',
		textAlign: 'right'
	},
	ownReactionText: {
		fontSize: 16,
		padding: 5,
		position: 'absolute'
	}
});
