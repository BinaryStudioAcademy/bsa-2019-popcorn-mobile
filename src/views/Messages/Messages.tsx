import React, { Fragment } from 'react';
import { View, ScrollView } from 'react-native';
import {
	fetchMessages,
	deleteMessage,
	updateMessage,
	unsetNewChat
} from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NewMessage from './NewMessage';
import OutgoingMessage from './OutgoingMessage';
import { styles } from './styles';
import IncomingMessage from './IncomingMessage';
import Spinner from '../../components/Spinner/Spinner';
import { getNewDate } from './getNewDate';

interface IProps {
	fetchMessages: (userId: string, chatId: string) => void;
	chat: any;
	userId: string;
	isLoadingMessages: boolean;
	navigation: any;
	deleteMessage: (id: string) => void;
	updateMessage: (id: string, body: string) => void;
	newChatId: string;
	unsetNewChat: () => void;
}
import { NewDate } from './NewDate';
import { Partner } from './Partner';
import { ReactionMessage } from './ReactionMessage';

interface IState {
	scrolling: boolean;
}
class Messages extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			scrolling: false
		};
	}
	componentDidUpdate(prevProps) {
		if (
			!this.state.scrolling &&
			this.props.chat &&
			this.props.chat.messages &&
			prevProps.chat &&
			prevProps.chat.messages &&
			this.props.chat.messages.length > prevProps.chat.messages.length
		) {
			this.setState({ scrolling: true });
		}
	}
	scrollToEnd = () => {
		this.refs.scrollView.scrollToEnd({ animated: true });
	};
	render() {
		const { chatId } = this.props.navigation.state.params;
		if (!this.props.chat) {
			return <Spinner />;
		}
		if (
			(!this.props.chat.messages && !this.props.isLoadingMessages) ||
			this.props.chat.unreadMessagesCount
		) {
			this.props.fetchMessages(this.props.userId, chatId);
		}
		let isNewChat =
			this.props.newChatId && this.props.chat.id == this.props.newChatId;
		if (!this.props.chat.messages) {
			return <Spinner />;
		}
		const { messages } = this.props.chat;
		let tmpDate = '';
		if (isNewChat) {
			this.props.unsetNewChat();
		}
		return (
			<View style={styles.container}>
				<Partner user={this.props.chat.user} />
				<View style={styles.messagesContainer}>
					<ScrollView
						ref="scrollView"
						onLayout={() => this.scrollToEnd()}
						onContentSizeChange={() => {
							if (this.state.scrolling) {
								this.scrollToEnd();
								this.setState({ scrolling: false });
							}
						}}
					>
						{messages &&
							messages.map((message: any, id) => {
								const date = new Date(message.created_at);
								let newDate = getNewDate(date);
								const currentDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
								const isMyMessage = message.user.id === this.props.userId;
								if (currentDate !== tmpDate) {
									tmpDate = currentDate;
									return isMyMessage ? (
										<View>
											<NewDate newDate={newDate} />
											{message.story ? (
												<ReactionMessage
													key={message.id}
													message={message}
													isOwn={isMyMessage}
												/>
											) : null}
											{!message.reactionType ? (
												<OutgoingMessage
													key={message.id}
													outgoingMessage={message}
												/>
											) : null}
										</View>
									) : (
										<View>
											<NewDate newDate={newDate} />
											{message.story ? (
												<ReactionMessage
													key={message.id}
													message={message}
													isOwn={isMyMessage}
												/>
											) : null}
											{!message.reactionType ? (
												<IncomingMessage
													key={message.id}
													outgoingMessage={message}
												/>
											) : null}
										</View>
									);
								} else {
									return (
										<Fragment>
											{message.story ? (
												<ReactionMessage
													key={message.id}
													message={message}
													isOwn={isMyMessage}
												/>
											) : null}

											{!message.reactionType && isMyMessage ? (
												<OutgoingMessage
													key={message.id}
													outgoingMessage={message}
												/>
											) : !message.reactionType ? (
												<IncomingMessage
													key={message.id}
													outgoingMessage={message}
												/>
											) : null}
										</Fragment>
									);
								}
							})}
					</ScrollView>
				</View>
				<View style={styles.sendMessageWrap}>
					<NewMessage
						chatId={this.props.chat.id}
						scrollToEnd={this.scrollToEnd.bind(this)}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	chat: rootState.chat.chats[props.navigation.state.params.chatId],
	newChatId: rootState.chat.newChatId,
	сhats: rootState.chat.сhats,
	isLoadingMessages: rootState.chat.isLoadingMessages,
	userId: rootState.authorization.profileInfo.id
});

const actions = {
	fetchMessages,
	deleteMessage,
	updateMessage,
	unsetNewChat
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Messages);
