import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import INotification from './INotification';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faComments, faStar
} from '@fortawesome/free-solid-svg-icons';
import { generateIcon } from '../../services/notification.service';

interface IProps {
    notification: INotification;
    readNotification: (any: any) => any
    userId: string
    navigation: any
}

const Notification: React.FC<IProps> = ({ notification, readNotification, userId, navigation }) => {
    const onPress = () => {
        readNotification({ id: notification.id, userId });
        const type = notification.entityType;
        if (type === 'post' || type === 'story') navigation.navigate('Home');
        if (type === 'event') navigation.navigate('Event', { eventId: notification.entityId })
    }

    return (
        <TouchableOpacity 
            style={[styles.main, !notification.isRead && styles.unread ]} 
            onPress={onPress}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: notification.img || 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png'}} style={styles.avatar} />
                <View style={styles.icon}>
                    {generateIcon(notification.type)}
                </View>
            </View>
            <View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{notification.title}</Text>
                </View>
                <Text style={[styles.text, styles.date]}>
                    {Moment(notification.date).format(' D MMM HH:mm ')}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default Notification;

const styles = StyleSheet.create({
    main: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContainer: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginBottom: 5
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    imageContainer: {
        width: 55,
        height: 55,
        marginRight: 10
    },
    text: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#122737',
    },
    userName: {
        fontFamily: 'Inter-Bold'
    },
    date: {
        color: 'rgba(0, 0, 0, 0.8)',
        fontSize: 12
    },
    unread: {
        backgroundColor: '#edf2fa'
    },
    icon: {
        position:'absolute',
        bottom: 0,
        right: 0,
        width: 26,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center'
    }
})