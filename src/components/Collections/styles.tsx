import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
		flex: 1
    },
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
		width: 25,
		height: 25,
		borderRadius: 12.5,
		backgroundColor: '#adadad'
	},
	firstColumn: {
		marginRight: 10,
		justifyContent: 'center'
	},
	thirdColumn: {
		marginLeft: 'auto',
		justifyContent: 'space-between'
	},
	secondColumn: {
		width: '40%'
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
		fontSize: 13,
		fontFamily: 'Inter-Regular',
		color: '#122737',
		letterSpacing: 0.4
	},
	date: {
		fontSize: 10,
		color: 'rgba(0, 0, 0, 0.5)'
	},
	movieAmount: {
		fontSize: 10,
		textTransform: 'uppercase',
		fontFamily: 'Inter-Medium',
		textAlign: 'right',
		marginTop: 'auto',
        textDecorationLine: 'underline',
        marginBottom: 5
    },
    addCollectionBttn: {	
		width: 130,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		height: 25,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FF6501',
		marginTop: 20,
		borderRadius: 55,
		padding: 2,
        marginBottom: 10,
        alignSelf: 'center'
    },
    bttnText: {
		fontFamily: 'Inter-Medium',
		color: 'white'
	}
});