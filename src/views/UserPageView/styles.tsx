import { StyleSheet } from 'react-native';
export const ORANGE_PROFILE = '#FF6501';

export const styles = StyleSheet.create({
	profileWrap: {
		maxHeight: 300,
		height: 300,
		flex: 1,
		paddingTop: 20,
		paddingLeft: 10,
		paddingRight: 20
		// justifyContent: 'center',
		// alignItems: 'center'
	},
	userInfo: {
		// flex: 1,
		// flex: 3,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	userMainInfo: {
		justifyContent: 'flex-start',
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
	profileImg: {
		width: 50,
		height: 50,
		marginRight: 10
	},
	userPersonal: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 5
		// width: '100%'
	},
	mainWrap: {
		justifyContent: 'center'
	},
	userAbout: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 15
		// width: '100%'
	},
	userFavorites: {
		marginTop: 25,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start'
	},
	userName: {
		fontSize: 18,
		fontFamily: 'Inter-Medium',
		color: '#000',
		fontWeight: '600'
	},
	userFavSubtitle: {
		width: 95,
		fontWeight: 'bold',
		color: '#000',
		letterSpacing: 0.4
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
		marginBottom: 15,
		marginLeft: 5
	},
	userMoviesWrap: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start'
	},
	userIcon: {
		marginLeft: 10,
		fontWeight: '900',
		width: 15,
		alignSelf: 'center',
		color: ORANGE_PROFILE
	},
	horizontalContainer: {
		flexDirection: 'row',
		marginLeft: 'auto',
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	followBlock: {
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 30
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
		marginTop: 5,
		justifyContent: 'center'
	},
	bttnText: {
		fontSize: 15,
		fontFamily: 'Inter-SemiBold',
		letterSpacing: 0.4,
		textAlign: 'center',
		width: '100%',
		padding: '2%',
		borderRadius: 5,
		height: 26
	},
	followBttnText: {
		backgroundColor: '#FF6501',
		color: 'white'
	},
	unfollowBttnText: {
		color: '#FF6501',
		borderWidth: 2,
		borderColor: '#FF6501'
	}
});
