import React, { Component, Fragment } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	TextInput
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchMessages, deleteMessage, updateMessage } from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'native-base';
import config from '../../config';
import moment from 'moment';
import NewMessage from './NewMessage';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import OutgoingMessage from './OutgoingMessage';
import { styles } from './styles';
import IncomingMessage from './IncomingMessage';

interface IProps {
	fetchMessages: (userId: string, chatId: string) => void;
	chat: any; //todo
	userId: string;
	isLoadingMessages: boolean;
	navigation: any;
	deleteMessage: (id: string) => void;
	updateMessage: (id: string, body: string) => void;
}

interface IState {}
class Messages extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};
	}
	render() {
		const { chatId } = this.props.navigation.state.params;
		console.log('[MESSAGES]this.props', this.props);
		if (!this.props.chat) {
			return <Spinner />;
		}
		if (!this.props.chat.messages && !this.props.isLoadingMessages) {
			this.props.fetchMessages(this.props.userId, chatId);
		}
		if (!this.props.chat.messages) {
			return <Spinner />;
		}
		const { messages } = this.props.chat;
		// const messages = mockMessages;
		return (
			<View style={styles.container}>
				<ScrollView
					contentContainerStyle={styles.messagesContainer}
					ref="scrollView"
					onLayout={() => this.refs.scrollView.scrollToEnd({ animated: true })}
					onContentSizeChange={(contentWidth, contentHeight) => {
						this.refs.scrollView.scrollToEnd({ animated: true });
					}}
				>
					{messages.map((message: any, id) => {
						const isMyMessage = message.user.id === this.props.userId;

						return isMyMessage ? (
							<OutgoingMessage key={message.id} outgoingMessage={message} />
						) : (
							<IncomingMessage key={message.id} outgoingMessage={message} />
						);
					})}
				</ScrollView>
				<View style={styles.sendMessageWrap}>
					<NewMessage chatId={this.props.chat.id} />
				</View>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	chat: rootState.chat.chats[props.navigation.state.params.chatId],
	isLoadingMessages: rootState.chat.isLoadingMessages,
	userId: rootState.authorization.profileInfo.id
});

const actions = {
	fetchMessages,
	deleteMessage,
	updateMessage
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Messages);

// 		admin@gmail.com
