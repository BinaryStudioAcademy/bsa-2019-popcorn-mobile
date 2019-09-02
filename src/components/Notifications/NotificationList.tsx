import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Notification from './Notification';
import { connect } from 'react-redux';
import { addNotification } from './actions';
import { bindActionCreators } from 'redux';
import { fetchNotifications, readNotification } from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import SocketService from '../../helpers/socket.helper';
import { isEqual } from 'lodash';

interface IActivity {
	type: string;
	title: string;
	body: string;
	date: string;
	img: string;
	isRead?: boolean;
	url: string;
	id: string;
}

interface IParams {
	userId: string;
	id: string;
}

interface IProps {
	userInfo: any;
	loading: boolean;
	fetchNotifications: (userId: string) => void;
	addNotification: (notification: any) => any;
	setNotificitationIsRead: (IParams) => void;
	unreadNotifications: Array<IActivity>;
	readNotification: (string) => any;
	navigation: any;
}

interface IState {
	notifications: Array<IActivity>;
}

class NotificationList extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			notifications: []
		};
		this.addSocketEvents();
	}

	componentDidMount() {
		this.props.unreadNotifications.length === 0 &&
			this.props.fetchNotifications(this.props.userInfo.id);
		this.setState({
			...this.state,
			notifications: this.props.unreadNotifications
		});
	}

	componentWillReceiveProps(nextProps) {
		if (!isEqual(nextProps.unreadNotifications, this.state.notifications)) {
			this.setState({
				...this.state,
				notifications: nextProps.unreadNotifications
			});
		}
	}

	addSocketEvents = () => {
		SocketService.join(this.props.userInfo.id);
		SocketService.on('new-notification', this.addNotification);
	};

	addNotification = (data: IActivity) => {
		this.props.fetchNotifications(this.props.userInfo.id);
		const notifications = this.state.notifications;
		this.setState({
			notifications: [...notifications, { ...data, isRead: false }]
		});
	};

	render() {
		const orderedNotifications = this.state.notifications.reverse();
		if (this.props.loading) return <Spinner />;
		return (
			<FlatList
				refreshing={false}
				data={orderedNotifications}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<Notification
						navigation={this.props.navigation}
						notification={item}
						readNotification={this.props.readNotification}
						userId={this.props.userInfo.id}
					/>
				)}
			/>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	unreadNotifications: rootState.notifications.unreadNotifications,
	userInfo: rootState.authorization.profileInfo,
	loading: rootState.notifications.loading
});

const actions = {
	fetchNotifications,
	addNotification,
	readNotification
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotificationList);
