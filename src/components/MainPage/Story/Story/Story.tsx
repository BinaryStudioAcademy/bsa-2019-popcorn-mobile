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
	FlatList
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { captionFont } from '../StoryModal/styles';
const { StatusBarManager } = NativeModules;
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
		reactionType: 'like',
		value: '🤣'
	},
	{
		id: 2,
		reactionType: 'dislike',
		value: '🔥'
	},
	{
		id: 3,
		reactionType: 'popcorn',
		value: '👏🏻'
	},
	{
		id: 4,
		reactionType: 'haha',
		value: '🤩'
	},
	{
		id: 5,
		reactionType: 'wow',
		value: '😢'
	},
	{
		id: 6,
		reactionType: 'sad',
		value: '😳'
	},
	{
		id: 7,
		reactionType: 'angry',
		value: '😡'
	},
	{
		id: 8,
		reactionType: 'fire',
		value: '🥳'
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

	getIcon(reactionType) {
		switch (reactionType) {
			case 'like':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/like.svg`)}
					/>
				);
			case 'dislike':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/dislike.svg`)}
					/>
				);
			case 'popcorn':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/popcorn.svg`)}
					/>
				);
			case 'haha':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/haha.svg`)}
					/>
				);
			case 'wow':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/wow.svg`)}
					/>
				);
			case 'sad':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/sad.svg`)}
					/>
				);
			case 'angry':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/angry.svg`)}
					/>
				);
			case 'fire':
				return (
					<SvgUri
						height={45}
						width={45}
						source={require(`./../../../../assets/reactions/fire.svg`)}
					/>
				);
		}
	}
	renderControls(navigation) {
		return (
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<SvgUri
					height={30}
					source={require('./../../../../assets/general/x.svg')}
				/>
			</TouchableOpacity>
		);
	}
	renderReactions(item) {
		return (
			<TouchableOpacity
				onPress={() => this.sendReactionMessage(item.reactionType)}
			>
				<View style={styles.reactionWrapper}>
					{this.getIcon(item.reactionType)}
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
		message
	) {
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
					<Text style={[styles.renderCaption, { color: fontColor }]}>
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
			fontColor
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
			message
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
		// height: '100%',
		// width: '100%'
	},
	renderCaption: {
		fontFamily: captionFont,
		fontWeight: '600',
		fontSize: 20,
		lineHeight: 20,
		letterSpacing: 0.4,
		padding: 5,
		position: 'absolute',
		bottom: '10%',
		left: 'auto',
		textAlign: 'center',
		width: '100%'
	},
	userBlock: {
		position: 'relative',
		zIndex: 5,
		paddingTop: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	userName: {
		fontFamily: 'Inter-Regular',
		fontSize: 17,
		lineHeight: 20,
		letterSpacing: 0.4,
		padding: 5,
		color: 'rgb(252, 252, 252)'
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
