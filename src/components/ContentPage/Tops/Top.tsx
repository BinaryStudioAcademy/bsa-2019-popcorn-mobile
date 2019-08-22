import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Moment from 'moment';

interface IProps {
    navigation: any,
    top: any
}

const Top: React.FC<IProps> = ({ top, navigation }) => {
    const { topImageUrl, title, movieInTop, user, created_at } = top;
    return (
        <TouchableOpacity style={styles.main} onPress={() => { navigation.navigate('TopPage', { top }) }}>
            <View style={styles.container}>
                <View style={styles.firstColumn}>
                    <Image 
                        source={{ uri: topImageUrl || 'https://www.goldderby.com/wp-content/uploads/2017/12/Oscar-statuette-trophy-atmo.png' }} 
                        style={{ width: 120, height: 80 }}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    {   
                        movieInTop.map((movie, id) => {
                            if (id > 2) return null;
                            return (
                                <Text style={styles.text} key={id}>
                                    {id + 1}. {movie.movie.title} {id === 2 && '...'}
                                </Text>
                            );
                        })
                    }
                </View>
                <View style={styles.thirdColumn}>
                    <View style={styles.userInfo}>
                        <Image 
                            source={{ uri: user.avatar || 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png'}}
                            style={styles.roundImage}
                        />
                    </View>
                    <Text style={[styles.text, styles.date]}>
                        {Moment(created_at).format('ll')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default Top;

const styles = StyleSheet.create({
    main: {
        margin: 10
    },
    container: {
        flexDirection: 'row',
        alignContent: 'stretch',
        padding: 10,
        borderColor: 'rgba(0, 0, 0, .1)',
        borderWidth: 1
    },
    roundImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#adadad'
    },
    firstColumn: {
        marginRight: 7,
        justifyContent: 'center'
    },
    thirdColumn: {
        marginLeft: 'auto',
        justifyContent: 'space-between'
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        marginBottom: 3,
        color: '#122737'
    },
    text: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#122737'
    },
    date: {
        fontSize: 10,
        color: 'rgba(0, 0, 0, 0.5)'
    }
})