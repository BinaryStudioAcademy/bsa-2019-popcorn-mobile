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
import { NewDate } from './NewDate';
import { Partner } from './Partner';

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
		console.log('this.props', this.props);
		if (
			!this.state.scrolling &&
			this.props.chat &&
			this.props.chat.messages &&
			prevProps.chat &&
			prevProps.chat.messages &&
			this.props.chat.messages.length > prevProps.chat.messages.length
		) {
			console.log('SCROLL', this.props);
			this.setState({ scrolling: true });
		}
	}
	scrollToEnd = () => {
		this.refs.scrollView.scrollToEnd({ animated: true });
	};
	getNewDate(date) {
		const beforeYesterday = moment()
			.add(-2, 'day')
			.endOf('day');
		const yesterday = moment()
			.add(-1, 'day')
			.endOf('day');

		let newDate = '';
		if (moment(date) > yesterday) newDate = 'Today';
		else if (moment(date) < yesterday && moment(date) > beforeYesterday)
			newDate = 'Yesterday';
		else
			newDate = moment(date)
				.utc()
				.format('D MMMM');
		return newDate;
	}
	render() {
		const { chatId } = this.props.navigation.state.params;
		if (!this.props.chat) {
			return <Spinner />;
		}
		if (!this.props.chat.messages && !this.props.isLoadingMessages) {
			this.props.fetchMessages(this.props.userId, chatId);
		}
		if (!this.props.chat.messages) {
			return <Spinner />;
		}
		console.log('[MESSAGES] this.props.chat', this.props.chat);
		const { messages } = this.props.chat;
		let tmpDate = '';
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
						{messages.map((message: any, id) => {
							const date = new Date(message.created_at);
							let newDate = this.getNewDate(date);
							const currentDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
							const isMyMessage = message.user.id === this.props.userId;
							if (currentDate !== tmpDate) {
								tmpDate = currentDate;
								return isMyMessage ? (
									<View>
										<NewDate newDate={newDate} />
										<OutgoingMessage
											key={message.id}
											outgoingMessage={message}
										/>
									</View>
								) : (
									<View>
										<NewDate newDate={newDate} />
										<IncomingMessage
											key={message.id}
											outgoingMessage={message}
										/>
									</View>
								);
							} else {
								return isMyMessage ? (
									<OutgoingMessage key={message.id} outgoingMessage={message} />
								) : (
									<IncomingMessage key={message.id} outgoingMessage={message} />
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
