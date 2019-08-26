import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import notifications from './Notifications.mock';
import Notification from './Notification';

class NotificationList extends Component {
    render() {
        notifications.reverse();
        return (
            <FlatList 
                refreshing={false}
                data={notifications}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Notification notification={item} />}
            />
        );
    }
}

export default NotificationList;