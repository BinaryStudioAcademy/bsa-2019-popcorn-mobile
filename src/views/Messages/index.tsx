import React, { Component, Fragment } from 'react';
import {
	fetchChats,
	addMessage,
	deleteMessageStore,
	updateMessageStore,
	addUnreadMessage
} from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'native-base';
import ChatList from './ChatList';

interface IProps {
	fetchChats: (userId) => void;
	chats: any;
	userProfile: any;
	isLoadingList: boolean;
	addMessage: (any) => void;
	deleteMessageStore: (chatId, messageId) => void;
	updateMessageStore: (chatId, message) => void;
	addUnreadMessage: (chatId, message) => void;

	navigation: any;
}
interface IState {}

class ChatPage extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchChats(this.props.userProfile.id);
	}
	render() {
		if (
			this.props.isLoadingList ||
			!Object.keys(this.props.chats).length ||
			!this.props.chats
		)
			return <Spinner />;
		return <ChatList navigation={this.props.navigation} />;
	}
}

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
)(ChatPage);
