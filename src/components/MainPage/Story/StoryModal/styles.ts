import { StyleSheet, Dimensions, Platform } from 'react-native';
const orange = '#f57c00';
const imageWrapHeight = '65%';
export const captionFont = 'Inter-Medium';
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
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'absolute',
		top: 5,
		zIndex: 12
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
	btnNavigate: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		padding: 5,
		width: '100%',
		zIndex: 10,
		overflow: 'visible',
		bottom: 0,
		alignItems: 'flex-end',
		height: 50
	},
	mainView: {
		flex: 1,
		height: '100%',
		backgroundColor: 'rgba(255,255,255,1)',
		justifyContent: 'flex-start',
		alignItems: 'center',
		position: 'relative'
	},
	extra: {
		marginTop: 5,
		marginRight: 'auto',
		marginBottom: 15,
		marginLeft: 'auto',
		borderLeftWidth: 5,
		borderColor: 'rgba(0, 0, 0, 0.11)',
		padding: 15,
		width: '96%',
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
		height: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	uploadWrap: {
		width: '100%',
		height: '100%',
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
		marginBottom: 3
	},
	colorPaletteWrap: {
		height: '85%',
		alignItems: 'center',
		justifyContent: 'space-between',
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
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		width: '10%',
		alignSelf: 'flex-start',
		marginRight: 15,
		marginLeft: 'auto'
	},
	text: {
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		color: '#122737'
	},
	renderExtraWrap: {
		width: '90%',
		position: 'absolute',
		bottom: 30,
		right: 5
	},
	title: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 16,
		marginBottom: 3,
		width: '75%'
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
	},
	shadow: {
        shadowOpacity: 0.2,
        textShadowRadius: 1.5,
        textShadowOffset: { width: 1, height: 0 }
	}
});
