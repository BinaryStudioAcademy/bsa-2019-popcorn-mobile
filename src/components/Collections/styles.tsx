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
    },
    avatar: {
		width: 30, 
		height: 30,
        marginRight: 10,
        borderRadius: 15
	},
	collectionDate: {
		marginLeft: 'auto'
	},
	imageBackground: {
		width: '100%',
		height: 180
	},
	background: {
		flex: 1,
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		padding: 10
	},
	imageText: {
		color: 'white',
		fontFamily: 'Inter-Medium'
	},
	poster: {
		height: 200,
		width: 134
	},
	collectionText: {
		fontFamily: 'Inter-Regular',
		color: '#122737',
		letterSpacing: 0.4
	},
	collectionTitle: {
		marginTop: 'auto',
		fontFamily: 'Inter-Black',
		fontSize: 32,
		letterSpacing: 0.4,
		marginBottom: 10
	},
	horizontalContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	description: {
		margin: 10,
		fontSize: 16,
		marginBottom: 20
	},
	topItem: {
		margin: 10,
		flexDirection: 'row'
	},
	number: {
		fontSize: 18,
		lineHeight: 25,
		color: 'white',
		fontFamily: 'Inter-Bold',
		width: 25,
		height: 25,
		backgroundColor: '#FF6501',
		marginRight: 5,
		textAlign: 'center'
	},
	movieTitle: {
		fontSize: 18,
		fontFamily: 'Inter-SemiBold',
		lineHeight: 25,
		flex: 1,
	},
	titleContainer: {
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'flex-start',
		width: '100%'
	},
	comment: {
		fontSize: 14
	},
	input: {
		width: '90%',
		margin: 20,
		borderColor: 'rgba(0, 0, 0, 0.11)',
		borderWidth: 1,
		padding: 12,
		paddingLeft: 15,
		fontSize: 16,
		borderRadius: 3,
	},
	imageUploader: {
		marginLeft: 20,
		marginBottom: 10,
		alignSelf: 'center'
	},
	UploadWrp: {
		width: '85%',
		marginLeft: 'auto',
		marginRight: 'auto',
		height: 200
	},
	collectionImage: {
		height: 200,
		borderRadius: 20,
		backgroundColor: '#adadad'
	}
});