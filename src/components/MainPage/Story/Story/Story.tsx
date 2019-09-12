import React, { Component } from 'react';
import config from '../../../../config';
import {
	Text,
	View,
	ImageBackground,
	Image,
	StyleSheet,
	TouchableOpacity,
	Platform,
	NativeModules,
	TextInput,
	FlatList,
	Dimensions
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { getIcon } from './../../../../services/postReaction.service';
import { captionFont } from '../StoryModal/styles';
import * as CrossIcon from './../../../../assets/general/x.svg';
const { StatusBarManager } = NativeModules;
const window_width = Dimensions.get('window').width;
const window_height = Dimensions.get('window').height;
const STORY_HEIGHT = 622;
const STORY_WIDTH = 350;
const COEFFICIENT_X = window_height / STORY_HEIGHT;
const COEFFICIENT_Y = window_width / STORY_WIDTH;
const USER_BLOCK_HEIGHT = 65;
const OFFSET_Y = 1.25 * COEFFICIENT_Y;
const OFFSET_X = 1.25 * COEFFICIENT_X;
interface IStoryListItem {
	id: string;
	caption: string;
	image_url: string;
	user: {
		avatar: string;
		id: string;
		name: string;
		any;
	};
	backgroundColor: string;
	fontColor: string;
	type: string;
	textPositionX: number;
	textPositionY: number;
	voting?: {
		backColor: string;
		backImage: string;
		deltaPositionHeadX: number;
		deltaPositionHeadY: number;
		deltaPositionOptionBlockX: number;
		deltaPositionOptionBlockY: number;
		header: string;
		id: string;
		options: Array<{
			body: string;
			voted: number;
		}>;
	};
}
interface IStoryListItemProps {
	story: IStoryListItem;
	navigation: any;
	userId: string;
	chats: any;
	createMessage: (userId: string, chatId: string, body: any) => void;
	createChat: (userId1: string, chatId2: string, newMessage: any) => void;
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
	},
	{
		id: 8,
		reactionType: 'fire'
	}
];
interface IState {
	showReactions: boolean;
	message?: string;
}
class StoryListItem extends Component<IStoryListItemProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			showReactions: false
		};
	}

	renderControls(navigation) {
		return (
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<SvgUri width={30} height={30} svgXmlData={CrossIcon} />
			</TouchableOpacity>
		);
	}
	renderReactions(item) {
		return (
			<TouchableOpacity
				onPress={() => this.sendReactionMessage(item.reactionType)}
			>
				<View style={styles.reactionWrapper}>
					{getIcon(item.reactionType, 45)}
				</View>
			</TouchableOpacity>
		);
	}

	changeMessageValue(value) {
		this.setState({
			message: value
		});
	}

	getChatId = id => {
		for (const chatId in this.props.chats) {
			if (this.props.chats[chatId].user.id === id) {
				return chatId;
			}
		}
	};

	sendReactionMessage(reactionType: string) {
		const { userId, story } = this.props;
		const chatId = this.getChatId(story.user.id);
		// this.setState({ showReactions: false })
		if (!chatId) {
			this.props.createChat(userId, story.user.id, {
				storyId: story && story.id,
				reactionType
			});
			return;
		}
		this.props.createMessage(userId, chatId, {
			storyId: story.id,
			reactionType
		});
	}

	sendMessage(message) {
		const { userId, story } = this.props;
		const chatId = this.getChatId(story.user.id);
		if (message.trim() === '') return;
		this.setState({ message: '' });
		if (!chatId) {
			this.props.createChat(userId, story.user.id, {
				body: message,
				storyId: story && story.id
			});
			return;
		}
		this.props.createMessage(userId, chatId, {
			body: message,
			storyId: story && story.id
		});
	}

	renderContent(
		imageUrl,
		avatar,
		caption,
		name,
		navigation,
		backgroundColor,
		fontColor,
		showReactions,
		message,
		textPositionX,
		textPositionY
	) {
		let offsetY =
			textPositionY * OFFSET_Y +
			(textPositionY < USER_BLOCK_HEIGHT ? USER_BLOCK_HEIGHT + 6 : 0);
		let offsetX = textPositionX * OFFSET_X;
		return (
			<View style={[styles.storyWrapper, { backgroundColor: backgroundColor }]}>
				<View style={styles.storyImageWrapper}>
					{showReactions && <View style={styles.overlay}></View>}
					<View style={styles.userBlock}>
						<Image
							style={styles.roundImage}
							source={{ uri: avatar || config.DEFAULT_AVATAR }}
						/>
						<Text style={styles.userName}>{name}</Text>
						<View style={styles.closeWrapper}>
							{this.renderControls(navigation)}
						</View>
					</View>
					<ImageBackground
						style={styles.storyImage}
						source={{ uri: imageUrl }}
						resizeMode="contain"
					></ImageBackground>
					<Text
						style={[
							styles.renderCaption,
							{ color: fontColor, top: offsetY, left: offsetX }
						]}
					>
						{caption}
					</Text>
					{showReactions && (
						<View style={styles.reactionsListWrapper}>
							<FlatList
								style={styles.reactionsList}
								horizontal={false}
								numColumns={4}
								data={reactions}
								keyboardShouldPersistTaps={'always'}
								// keyExtractor={item => item.id}
								renderItem={({ item }) => this.renderReactions(item)}
							/>
						</View>
					)}

					<View style={styles.reactionInputWrapper}>
						<TextInput
							onFocus={() => this.setState({ showReactions: true })}
							onBlur={() => this.setState({ showReactions: false })}
							placeholderTextColor={'rgb(252, 252, 252)'}
							onChangeText={value => this.changeMessageValue(value)}
							value={message}
							style={[styles.reactionInput, styles.reactionInputText]}
							placeholder={`Message ${name}`}
						/>

						{message ? (
							<View>
								<TouchableOpacity onPress={() => this.sendMessage(message)}>
									<Text style={[styles.reactionInputText, styles.bold]}>
										Send
									</Text>
								</TouchableOpacity>
							</View>
						) : null}
					</View>
				</View>
			</View>
		);
	}
	render() {
		const {
			image_url: imageUrl,
			user: { name, avatar },
			caption,
			backgroundColor,
			fontColor,
			textPositionX,
			textPositionY
		} = this.props.story;
		const { navigation } = this.props;
		const { showReactions, message } = this.state;
		return this.renderContent(
			imageUrl,
			avatar,
			caption,
			name,
			navigation,
			backgroundColor,
			fontColor,
			showReactions,
			message,
			textPositionX,
			textPositionY
		);
	}
}

const HEADER_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const styles = StyleSheet.create({
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0,0,0, 0.7)'
	},
	storyWrapper: {
		flex: 1
	},
	roundImage: {
		width: 35,
		height: 35,
		borderRadius: 20,
		margin: 9
	},
	storyImageWrapper: {
		flex: 1,
		position: 'relative',
		justifyContent: 'center'
	},
	storyImage: {
		flex: 1
	},
	renderCaption: {
		fontFamily: captionFont,
		fontWeight: '600',
		fontSize: 20,
		lineHeight: 20,
		letterSpacing: 0.4,
		position: 'absolute',
		textAlign: 'center',
		width: 280
	},
	userBlock: {
		position: 'relative',
		backgroundColor: '#efecec6b',
		zIndex: 5,
		height: USER_BLOCK_HEIGHT,
		paddingTop: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	userName: {
		fontFamily: 'Inter-Regular',
		fontSize: 16,
		letterSpacing: 0.9,
		color: '#0c0c0c'
	},
	closeWrapper: {
		marginLeft: 'auto',
		marginRight: 9
	},
	reactionInputWrapper: {
		zIndex: 5,
		flexDirection: 'row',
		alignItems: 'center',
		position: 'absolute',
		bottom: 10,
		left: 8,
		right: 8,
		borderRadius: 20,
		borderWidth: 0.8,
		borderColor: 'rgba(252, 252, 252, 0.7)',
		backgroundColor: 'rgba(0, 0, 0, 0.1)'
	},
	bold: {
		fontFamily: 'Inter-Bold'
	},
	reactionInputText: {
		color: 'rgb(252, 252, 252)',
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		lineHeight: 20,
		letterSpacing: 0.4,
		padding: 13,
		paddingTop: 7,
		paddingBottom: 7
	},
	reactionInput: {
		flex: 1
	},
	reactionsListWrapper: {
		position: 'absolute',
		zIndex: 5,
		top: '35%',
		width: '100%',
		flexDirection: 'column',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	},
	reactionsList: {},
	reactionTitle: {
		color: 'rgb(252, 252, 252)',
		fontFamily: 'Inter-Regular',
		fontSize: 20,
		lineHeight: 25,
		letterSpacing: 0.4,
		marginBottom: 15
	},
	reactionWrapper: {
		margin: 13
	},
	reactionBody: {
		fontSize: 35,
		lineHeight: 35
	}
});

export default StoryListItem;
