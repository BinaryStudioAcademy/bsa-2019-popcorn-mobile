import React, { Component, Fragment } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	TextInput
} from 'react-native';

interface IProps {
	message: any;
	isOwn: boolean;
}
const getEmoji = reactionType => {
	switch (reactionType) {
		case 'laugh':
			return '🤣';
		case 'fire':
			return '🔥';
		case 'claps':
			return '👏🏻';
		case 'stars':
			return '🤩';
		case 'cry':
			return '😢';
		case 'shock':
			return '😳';
		case 'angry':
			return '😡';
		case 'holiday':
			return '🥳';
		default:
			break;
	}
};

export const ReactionMessage: React.FC<IProps> = ({ message, isOwn }) => {
	const { reactionType, story, body } = message;
	console.log('message reaction=', message);
	return (
		<View
			style={
				!isOwn ? styles.reactionMessageWrap : styles.ownReactionMessageWrap
			}
		>
			<Text style={!isOwn ? styles.reactionReply : styles.ownReactionReply}>
				{isOwn ? 'Replying to story' : 'Replies your story'}
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
					<Text style={!isOwn ? styles.reactionEmoji : styles.ownReactionEmoji}>
						{getEmoji(reactionType)}
					</Text>
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
		// flexDirection: 'row',
		// alignItems: 'center',
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
