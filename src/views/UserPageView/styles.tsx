import { StyleSheet } from 'react-native';
export const ORANGE_PROFILE = '#FF6501';
export const DARK_BLUE = '#11264ec4';

export const styles = StyleSheet.create({
	profileWrap: {
		flex: 1,
		paddingTop: 20,
		paddingLeft: 10,
		paddingBottom: 10,
		paddingRight: 10
	},
	userInfo: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10
	},
	userMainInfo: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flex: 1,
		flexDirection: 'row'
	},
	userLocation: {
		fontFamily: 'Inter-Regular',
		color: '#555',
		fontSize: 12,
		letterSpacing: 0.5,
		textTransform: 'uppercase'
	},
	messageIcon: {
		color: ORANGE_PROFILE
	},
	messageIcon2: {
		color: DARK_BLUE,
		marginRight: 5
	},
	sendMessage: {
		fontFamily: 'Inter-SemiBold',
		color: DARK_BLUE,
		letterSpacing: 0.4,
		fontSize: 14
	},
	messageIconWrap: {
		marginTop: 5,
		width: '100%',
		paddingLeft: 2,
		paddingRight: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		color: DARK_BLUE,
		borderWidth: 2,
		borderColor: DARK_BLUE,
		borderRadius: 7
	},
	userWrap: {
		flex: 1.5
	},
	imageWrap: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		position: 'relative'
	},
	profileImg: {
		flex: 0.3,
		width: 43,
		height: 43,
		marginRight: 10
	},
	userPersonal: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 5
	},
	mainWrap: {
		flex: 1.1,
		justifyContent: 'center'
	},
	userAbout: {
		flex: 1.5,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 15
	},
	userFavorites: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start'
	},
	userName: {
		position: 'relative',
		fontSize: 18,
		fontFamily: 'Inter-Medium',
		color: '#000',
		fontWeight: '600',
		justifyContent: 'space-between'
	},
	userFavSubtitle: {
		width: 85,
		fontWeight: 'bold',
		color: '#000',
		letterSpacing: 0.4,
		marginTop: 15
	},
	userSubtitle: {
		fontWeight: 'bold',
		color: '#808080',
		letterSpacing: 0.4
	},
	userMovies: {
		fontFamily: 'Inter-Medium',
		fontSize: 13,
		backgroundColor: ORANGE_PROFILE,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 3,
		paddingBottom: 3,
		borderRadius: 10,
		color: '#fff',
		lineHeight: 15,
		marginTop: 15,
		marginLeft: 5
	},
	userMoviesWrap: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start'
	},
	userIcon: {
		flex: 0.2,
		right: 0,
		width: 10,
		paddingLeft: 5,
		fontWeight: '900',
		alignSelf: 'center',
		color: ORANGE_PROFILE
	},
	horizontalContainer: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: 'auto',
		alignItems: 'flex-start',
		width: '100%',
		justifyContent: 'space-around',
		marginBottom: 5
	},
	horizontalContainerWrap: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: 'auto',
		alignItems: 'flex-start',
		justifyContent: 'space-between'
	},
	followBlock: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	followItem: {
		marginRight: 20
	},
	followText: {
		fontFamily: 'Inter-Regular',
		color: '#122737',
		letterSpacing: 0.4,
		fontSize: 12,
		textAlign: 'center'
	},
	followAmount: {
		fontSize: 16,
		fontFamily: 'Inter-SemiBold'
	},
	followBttn: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	bttnText: {
		fontSize: 14,
		fontFamily: 'Inter-SemiBold',
		letterSpacing: 0.4,
		textAlign: 'center',
		width: '100%',
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 5,
		paddingRight: 5,
		borderRadius: 7
	},
	followBttnText: {
		backgroundColor: DARK_BLUE,
		color: 'white',
		height: 26
	},
	unfollowBttnText: {
		color: DARK_BLUE,
		height: 26,
		borderWidth: 2,
		borderColor: DARK_BLUE
	}
});
