import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
	fetchChats,
	addMessage,
	deleteMessageStore,
	updateMessageStore,
	addUnreadMessage
} from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from '../../config';
import moment from 'moment';
import SocketService from '../../helpers/socket.helper';
import { INC_MESSAGE_BACKGROUND, INC_MESSAGE_COLOR } from './styles';

interface IProps {
	fetchChats: (userId) => void;
	chats: any;
	userProfile: any;
	isLoadingList: boolean;
	addMessage: (chatId, message) => void;
	deleteMessageStore: (chatId, messageId) => void;
	updateMessageStore: (chatId, message) => void;
	addUnreadMessage: (chatId, message) => void;
	navigation: any;
}

class ChatList extends React.Component<IProps> {
	constructor(props) {
		super(props);
		this.addSocketEvents();
	}
	addSocketEvents = () => {
		const { chats } = this.props;
		if (Object.keys(chats).length > 0) {
			Object.keys(chats).forEach(chat => SocketService.join(chat));
			SocketService.on('new-message', message => {
				const chatId = message.chat.id;
				return this.props.addUnreadMessage(chatId, message);
			});
			SocketService.on('delete-message', ({ chatId, messageId }) => {
				this.props.deleteMessageStore(chatId, messageId);
			});
			SocketService.on('update-message', ({ chatId, message }) => {
				this.props.updateMessageStore(chatId, message);
			});
		}
	};
	sortChats(chat1, chat2) {
		if (
			chat1.lastMessage &&
			chat2.lastMessage &&
			chat1.lastMessage.created_at < chat2.lastMessage.created_at
		) {
			return 1;
		}
		if (
			!chat1.lastMessage ||
			!chat2.lastMessage ||
			chat1.lastMessage.created_at > chat2.lastMessage.created_at
		) {
			return -1;
		}
		return 0;
	}
	getNewDate(date) {
		const beforeYesterday = moment()
			.add(-2, 'day')
			.endOf('day');
		const yesterday = moment()
			.add(-1, 'day')
			.endOf('day');

		let newDate = '';
		if (moment(date) > yesterday) {
			newDate = 'Today';
		} else if (moment(date) < yesterday && moment(date) > beforeYesterday) {
			newDate = 'Yesterday';
		} else {
			newDate = moment(date)
				.utc()
				.format('D MMMM');
		}
		return newDate;
	}
	render() {
		const chats = Object.values(this.props.chats).sort(this.sortChats);
		return (
			<ScrollView contentContainerStyle={styles.container}>
				{chats.map((chat: any, id) => {
					let isOwn =
						chat.lastMessage &&
						chat.lastMessage.user.id === this.props.userProfile.id;
					let { avatar } = chat.user;
					let name = isOwn ? 'You' : chat.user.name;
					let body, created_at, reactionType, story;
					if (chat.lastMessage) {
						body = chat.lastMessage.body;
						created_at = chat.lastMessage.created_at;
						reactionType = chat.lastMessage.reactionType;
						story = chat.lastMessage.story;
					} else {
						(body = ''),
							(created_at = new Date()),
							(reactionType = null),
							(story = null);
					}
					const date = new Date(created_at);
					let newDate = this.getNewDate(date);
					let isRead = !chat.unreadMessagesCount;
					return (
						<Fragment key={chat.id}>
							<TouchableOpacity
								style={styles.chatItem}
								onPress={() =>
									this.props.navigation.navigate('Messages', {
										chatId: chat.id,
										getNewDate: this.getNewDate
									})
								}
							>
								<View style={styles.chatAvatarWrap}>
									<Image
										source={{ uri: avatar ? avatar : config.DEFAULT_AVATAR }}
										style={styles.messageAvatar}
									/>
								</View>
								<View style={styles.messageContent}>
									<View style={styles.messageInfo}>
										<Text
											style={[
												styles.messageName,
												!isRead && !isOwn ? { fontWeight: '700' } : null
											]}
										>
											{name}
										</Text>
										<Text
											style={[
												styles.messageTime,
												!isRead && !isOwn ? { fontWeight: '700' } : null
											]}
										>
											{newDate}
										</Text>
									</View>

									<Text
										numberOfLines={2}
										style={[
											styles.messageText,
											!isRead && !isOwn ? { fontWeight: '700' } : null
										]}
									>
										{reactionType || story
											? 'Reacted to story'
											: typeof body === 'string'
											? body.length < 35
												? `${body}`
												: `${body.substring(0, 92)}...`
											: ''}
									</Text>
								</View>
								{!isRead && !isOwn && (
									<View style={styles.notification}>
										<Text style={styles.notificationNum}>
											{chat.unreadMessagesCount}
										</Text>
									</View>
								)}
							</TouchableOpacity>
							<View style={styles.chatStroke}></View>
						</Fragment>
					);
				})}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
	},
	notificationNum: {
		color: INC_MESSAGE_COLOR,
		fontSize: 12
	},
	notification: {
		width: 25,
		height: 25,
		borderRadius: 25 / 2,
		backgroundColor: INC_MESSAGE_BACKGROUND,
		position: 'absolute',
		right: 15,
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 5
	},
	chatAvatarWrap: {
		flex: 1
	},
	chatTitle: {
		fontFamily: 'Inter-Regular',
		fontSize: 20,
		padding: 10,
		width: '100%',
		backgroundColor: 'rgba(51,51,204,0.2)',
		textTransform: 'uppercase',
		textAlign: 'center'
	},
	chatItem: {
		flexDirection: 'row',
		padding: 13,
		alignItems: 'center'
	},
	chatContent: {},
	chatMessage: {
		fontFamily: 'Inter-Regular',
		fontSize: 13
	},
	messageContent: {
		flex: 7,
		position: 'relative'
	},
	messageInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 5
	},
	messageTime: {
		fontFamily: 'Inter-Regular',
		fontWeight: '300',
		color: '#555',
		fontSize: 13,
		paddingRight: 10
	},
	messageText: {
		fontFamily: 'Inter-Regular',
		fontSize: 13,
		fontWeight: '400'
	},
	messageName: {
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		fontWeight: '500'
	},
	messageAvatarWrap: {
		flex: 1
	},
	messageAvatar: {
		width: 30,
		height: 30,
		borderRadius: 30 / 2,
		marginRight: 15
	},
	chatStroke: {
		backgroundColor: '#dadada',
		height: 2,
		width: '100%'
	}
});

const mapStateToProps = (rootState, props) => ({
	...props,
	chats: rootState.chat.chats,
	userProfile: rootState.authorization.profileInfo,
	isLoadingList: rootState.chat.isLoadingList
});

const actions = {
	fetchChats,
	addMessage,
	deleteMessageStore,
	updateMessageStore,
	addUnreadMessage
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatList);
