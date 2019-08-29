import React, { ReactElement } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faComment, 
    faTag, 
    faThumbsUp, 
    faUserFriends, 
    faUsers,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import webApi from '../helpers/webApi.helper';
import config from '../config';

export const generateMessage = (type: string): string => {
    switch(type) {
        case 'post reaction': 
            return 'reacted to your post';
        case 'post comment':
            return 'commented on your post';
        case 'post tag': 
            return 'tagged you in a post';
        case 'post comment tag':
            return 'tagged you in the post comments';
        case 'event interested':
            return 'is interested in your event';
        case 'event participant':
            return 'joined your event';
        case 'event comment':
            return 'commented on your event';
        case 'event comment tag': 
            return 'tagged you in the event comments';
        case 'follower': 
            return 'started following you'
        case 'movie comment tag':
            return 'tagged you in the movie comments';
        case 'message':
            return 'wrote you a new message'
        default:
            return '';
    }
};

export const generateIcon = (type: string): ReactElement => {
    const style = { 
        fontSize: 15, 
        color: 'white'
    }
    if (type.includes('reaction')) return <FontAwesomeIcon icon={faThumbsUp} style={style}/>
    if (type.includes('tag')) return <FontAwesomeIcon icon={faTag} style={style}/>
    if (type.includes('follower')) return <FontAwesomeIcon icon={faUserFriends} style={style} />
    if (type.includes('comment')) return <FontAwesomeIcon icon={faComment} style={style}/>
    if (type.includes('event')) return <FontAwesomeIcon icon={faUsers} style={style} />
    return <FontAwesomeIcon icon={faEnvelope} style={style} />
}

export const sendDeviceToken = async (token) => {
    await webApi({
        endpoint: config.API_URL + '/api/auth/notification',
        method: 'PUT',
        body: {
            token,
            type: 'mobile'
        }
    })
}
