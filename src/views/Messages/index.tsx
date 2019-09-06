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
import { Spinner } from 'native-base';
import config from '../../config';
import moment from 'moment';
import SocketService from '../../helpers/socket.helper';
import { INC_MESSAGE_BACKGROUND, INC_MESSAGE_COLOR } from './styles';
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
		const chats = Object.values(this.props.chats);
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
