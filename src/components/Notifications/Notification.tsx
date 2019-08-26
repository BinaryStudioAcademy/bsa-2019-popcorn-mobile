import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import INotification from './INotification';
import { generateMessage, generateIcon } from '../../services/notification.service';
import Moment from 'moment';

interface IProps {
    notification: INotification
}

const Notification: React.FC<IProps> = ({ notification }) => {
    return (
        <TouchableOpacity style={[styles.main, !notification.isRead && styles.unread ]}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: notification.userInfo.avatar }} style={styles.avatar} />
                <View style={styles.icon}>
                    { generateIcon(notification.type) }
                </View>
            </View>
            <View>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.userName]}>{notification.userInfo.name} </Text>
                    <Text style={styles.text}>{generateMessage(notification.type)}</Text>
                </View>
                <Text style={[styles.text, styles.date]}>
                    {Moment(notification.date).format('MMM D [at] hh:mm a')}
                </Text>
            </View>
        </TouchableOpacity>
    )
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
        borderRadius: 13,
        bottom: 0,
        right: 0,
        backgroundColor: '#FF6501',
        width: 26,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center'
    }
})