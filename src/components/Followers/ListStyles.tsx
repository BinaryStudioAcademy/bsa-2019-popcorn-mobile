import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        paddingLeft: 20,
        paddingBottom: 20
    },
    follower: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 22.5
    },
    name: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#122737'
    }
});