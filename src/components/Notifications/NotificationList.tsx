import React, { Component } from 'react';
import { FlatList } from 'react-native';
import Notification from './Notification';
import { connect } from 'react-redux';
import { addNotification } from './actions';
import { bindActionCreators } from 'redux';
import { fetchNotifications, readNotification } from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import SocketService from '../../helpers/socket.helper';
import INotification from './INotification';

interface IParams {
    userId: string,
    id: string
}

interface IProps {
    userInfo: any,
    loading: boolean,
    fetchNotifications: (userId: string) => void;
    addNotification: (notification: any) => any
    setNotificitationIsRead: (IParams) => void;
    unreadNotifications: Array<INotification>;
    readNotification: (string) => any
    navigation: any
}

class NotificationList extends Component<IProps> {
    constructor(props) {
        super(props);
		this.addSocketEvents();
    }

    componentDidMount() {
        this.props.fetchNotifications(this.props.userInfo.id);
    }

    addSocketEvents = () => {
		SocketService.join(this.props.userInfo.id);
		SocketService.on('new-notification', this.props.addNotification);
    };
    
    render() {
        if (this.props.loading) return <Spinner />
        return (
            <FlatList 
                refreshing={false}
                data={this.props.unreadNotifications}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Notification 
                    navigation={this.props.navigation}
                    notification={item} 
                    readNotification={this.props.readNotification}
                    userId={this.props.userInfo.id}
                />}
            />
        );
    }
}

const mapStateToProps = (rootState, props) => ({
    ...props,
    unreadNotifications: [...rootState.notifications.unreadNotifications].reverse(),
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
)(NotificationList);;