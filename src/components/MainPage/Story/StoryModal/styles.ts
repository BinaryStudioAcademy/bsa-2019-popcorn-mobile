import { StyleSheet, Dimensions, Platform } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const orange = '#f57c00';
const imageHeight = '70%';
const imageWrapHeight = '65%';
// export const captionFont = Platform.OS === 'android' ? 'monospace' : 'Courier';
export const captionFont = 'Roboto';
export default StyleSheet.create({
	input: {
		position: 'absolute',
		marginTop: 10,
		zIndex: 100,
		bottom: 0,
		width: '90%',
		alignSelf: 'center',
		color: '#383838',
		fontWeight: '600',
		fontFamily: captionFont,
		letterSpacing: 0.1,
		fontSize: 16,
		height: 50,
		textAlign: 'center'
	},
	iconsWrp: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: 20
	},

	roundImage: {
		height: '100%',
		position: 'relative'
	},
	deleteImageOption: {
		position: 'absolute',
		top: 5,
		left: 5
	},
	extraItemWrp: {
		margin: 5,
		alignItems: 'flex-start',
		backgroundColor: '#f2f2f2',
		flex: 1
	},
	extraItem: {
		borderColor: orange,
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		fontSize: 18,
		marginBottom: 10,
		justifyContent: 'center',
		flexDirection: 'row'
	},
	buttonWrap: {
		position: 'absolute',
		top: -60,
		right: 0
	},
	mainView: {
		marginTop: 10,
		flex: 1,
		paddingTop: 20,
		backgroundColor: 'rgba(255,255,255,1)',
		justifyContent: 'flex-start',
		alignItems: 'center',
		position: 'relative'
	},
	extra: {
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 'auto',
		marginRight: 'auto',
		borderLeftWidth: 5,
		borderColor: 'rgba(0, 0, 0, 0.11)',
		padding: '2%',
		width: '80%',
		justifyContent: 'flex-start'
	},
	IconExtraWrp: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 42
	},
	timesCircle: {
		position: 'absolute',
		right: 0,
		top: 0
	},
	disabledBtn: {
		backgroundColor: 'rgba(68,68,68,0.3)'
	},
	imageEditWrap: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		height: imageWrapHeight,
		marginTop: 20
	},
	uploadWrap: {
		width: '70%',
		position: 'relative',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5
	},
	colorPicker: {
		flexDirection: 'column'
	},
	colorIcon: {
		marginBottom: 5
	},
	colorPaletteWrap: {
		width: '15%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	colorPalette: {
		alignItems: 'center'
	},
	bigFont: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	visitorsIcon: {
		marginRight: 3
	},
	visitors: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'flex-start'
	},
	text: {
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		color: '#122737'
	},
	renderExtraWrap: {
		width: '90%'
	},
	title: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 16,
		marginBottom: 3
	},
	horizontalContainer: {
		width: '90%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingRight: 10
	},
	container: {
		padding: 10,
		borderColor: 'rgba(0, 0, 0, .1)',
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	center: {
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center'
	},
	grid: {
		paddingTop: 15,
		width: '100%'
	}
});
