import React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faUsers, faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { 
    IEventFormatDataBase, 
    IEventFormatClient, 
    formatToClient 
} from '../../../services/event.service';
import Moment from 'moment';
import config from '../../../config';

interface IVisitor {
    event: string,
    status: string,
    isNew?: boolean
}

interface IProps {
    event: IEventFormatDataBase,
    navigation: any, 
    setVisitor: (IVisitor) => any,
    currentUser: string
}

const Event: React.FC<IProps> = ({ event, navigation, setVisitor, currentUser }) => {

    const visitor = event.eventVisitors.find(visitor => visitor.userId === currentUser);

    const setVisitorStatus = (status: string) => {
        if (visitor) {
            if (visitor.status === status) setVisitor({ status: '', visitorId: visitor.id });
            else setVisitor({ status, event: event.id, isNew: false, visitorId: visitor.id });
        } else {
            setVisitor({ status, event: event.id, isNew: true });
        }
    }

    const data: IEventFormatClient = formatToClient(event);
    Moment.locale('en');
    return (
        <TouchableOpacity style={styles.main} onPress={() => {navigation.navigate('EventPage', { event })}}>
            <View style={styles.container}>
                <View>
                    <Image 
                        source={{ uri: data.image || 'https://blog.hootsuite.com/wp-content/uploads/2017/06/social-media-content-calendar-940x470.jpg' }} 
                        style={{ width: 140, height: 100 }} 
                    />
                </View>
                <View style={styles.column}>
                    <View style={styles.horizontalContainer}>
                        <Text style={[styles.text, styles.title]}>{data.title}</Text>
                         <View style={[styles.visitors]}>
                            <FontAwesomeIcon style={{...styles.icon, color: '#122737' }} icon={faUsers} />
                            <Text>{data.eventVisitors.length}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>
                            {Moment(data.dateRange.startDate).format("D MMM HH:mm")} - 
                            {Moment(data.dateRange.endDate).format(" D MMM HH:mm")}
                        </Text>
                    </View>
                    {
                        !!data.description &&
                        <Text numberOfLines={1} style={[styles.text, styles.description]}>{data.description}</Text>
                    }
                    <View style={[styles.horizontalContainer]}>
                    <TouchableWithoutFeedback>
                        <TouchableOpacity  style={styles.button} onPress={() => setVisitorStatus('interested')}>
                            {
                                !!visitor && visitor.status === 'interested' &&
                                <FontAwesomeIcon style={styles.icon} icon={faCheck} />
                            }
                            {
                                (!visitor || visitor.status !== 'interested') && 
                                <FontAwesomeIcon style={styles.icon} icon={faStar} />
                            }
                            <Text style={[styles.text, styles.buttonText]}>Interested</Text>
                        </TouchableOpacity> 
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <TouchableOpacity style={styles.button} onPress={() => { setVisitorStatus('going') }}>
                            {
                                !!visitor && visitor.status === 'going' &&
                                <FontAwesomeIcon style={styles.icon} icon={faCheck} />
                            }
                            {
                                (!visitor || visitor.status !== 'going') && 
                                <FontAwesomeIcon style={styles.icon} icon={faUserPlus} />
                            }
                            <Text style={[styles.text, , styles.buttonText]}>Going</Text>
                        </TouchableOpacity>
                    </TouchableWithoutFeedback>
                    </View>
                </View>     
            </View>
        </TouchableOpacity>
    );
}

export default Event;

const styles = StyleSheet.create({
    main: {
        margin: 10
    },
    container: {
        padding: 10,
        borderColor: 'rgba(0, 0, 0, .1)',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        width: '100%'
    },
    imageContainer: {
        width: '35%'
    },
    button: {
        width: 105,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
		backgroundColor: '#FF6501',
		marginTop: 5,
		borderRadius: 55,
        padding: 2,
        alignSelf: 'flex-end'
    },
    text: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#122737'
    },
    title: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        marginBottom: 3
    },
    buttonText: {
        fontFamily: 'Inter-Medium',
        color: 'white'
    }, 
    icon: {
        color: 'white',
        marginLeft: 4,
        marginRight: 4
    },
    column: {
        width: '58%'
    },
    visitors: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        marginTop: 5,
        fontSize: 12
    }
});