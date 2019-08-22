import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface IProps {
    navigation: any,
    top: any
}

const Top: React.FC<IProps> = ({ top, navigation }) => {
    const { topImageUrl, title, movieInTop, user } = top;
    return (
        <View>
            <View>
                <Image 
                    source={{ uri: topImageUrl || 'https://www.goldderby.com/wp-content/uploads/2017/12/Oscar-statuette-trophy-atmo.png' }} 
                    style={{ width: 150, height: 100 }}
                />
            </View>
            <View>
                <Text>{title}</Text>
                {   
                    movieInTop.map((movie, id) => {
                        if (id > 2) return null;
                        return <Text key={id}>{id + 1} {movie.movie.title}</Text>
                    })
                }
            </View>
            <View>
                <View>
                    <Image 
                        source={{ uri: user.avatar || 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png'}}
                        style={styles.roundImage}
                    />
                    <Text>{user.name}</Text>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('TopPage', { top }) }}>
                    <Text>
                        View all
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default Top;

const styles = StyleSheet.create({
    roundImage: {
        width: 35,
        height: 35,
        borderRadius: 20,
        margin: 9,
        backgroundColor: '#adadad'
    },
})