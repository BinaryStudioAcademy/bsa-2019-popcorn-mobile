import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNotification } from '../Notifications/actions';
import { bindActionCreators } from 'redux';
import { fetchNotifications, readNotification } from '../../redux/routines';
import SocketService from '../../helpers/socket.helper';
import SvgUri from 'react-native-svg-uri';
import { View, StyleSheet, Text } from 'react-native';

interface IProps {
	userInfo: any;
	fetchNotifications: (userId: string) => void;
	isShown: boolean;
}

interface IState {
	isShown: boolean;
}

class NotificationIcon extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			isShown: false
		};
		this.addSocketEvents();
	}

	componentDidMount() {
		this.props.fetchNotifications(this.props.userInfo.id);
		this.setState({
			isShown: this.props.isShown
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isShown !== this.state.isShown) {
			this.setState({ isShown: nextProps.isShown });
		}
	}

	addSocketEvents = () => {
		SocketService.join(this.props.userInfo.id);
		SocketService.on('new-notification', this.onAdd);
	};

	onAdd = () => {
		this.setState({ isShown: true });
	};

	render() {
		return (
			<View>
				<SvgUri
					height={20}
					width={20}
					style={styles.item}
					source={require('../../assets/general/new.svg')}
				/>
				{this.state.isShown && <Text style={styles.iconAlert}></Text>}
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	isShown: !![...rootState.notifications.unreadNotifications].filter(
		item => !item.isRead
	).length,
	userInfo: rootState.authorization.profileInfo
});

const actions = {
	fetchNotifications
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotificationIcon);

const styles = StyleSheet.create({
	iconAlert: {
		width: 10,
		height: 10,
		backgroundColor: 'red',
		position: 'absolute',
		top: -5,
		right: -5,
		borderRadius: 5
	},
	item: {
		marginLeft: 11
	}
});
