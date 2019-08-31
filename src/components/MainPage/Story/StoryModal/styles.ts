import { StyleSheet, Dimensions, Platform } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const orange = '#ffab07';
const imageHeight = '70%';
const imageWrapHeight = '65%';
export const captionFont = Platform.OS === 'android' ? 'monospace' : 'Courier';

export default StyleSheet.create({
	input: {
		position: 'absolute',
		marginTop: 10,
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
	colorIcon: {
		width: 30,
		height: 30,
		overflow: 'hidden'
	},
	iconsWrp: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginBottom: 10
	},

	roundImage: {
		height: imageHeight,
		marginTop: 0,
		marginBottom: 0,
		position: 'relative'
	},
	imageOptionsWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		top: 10,
		left: 10,
		width: '90%'
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
	buttonWrp: {
		padding: 10,
		width: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FF6501',
		borderRadius: 10
	},
	button: {
		textAlign: 'center',
		fontSize: 18,
		color: 'white',
		fontFamily: 'Inter-SemiBold'
	},
	mainView: {
		marginTop: 10,
		flex: 1,
		padding: '3%',
		backgroundColor: 'rgba(255,255,255,1)',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	extra: {
		marginTop: 10,
		marginBottom: 10,
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
	UploadWrp: {
		width: '80%',
		height: imageWrapHeight,
		position: 'relative',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5
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
		marginLeft: 5,
		alignSelf: 'flex-start'
	},
	text: {
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		color: '#122737'
	},
	title: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 16,
		marginBottom: 3
		// width: '75%'
	},
	horizontalContainer: {
		width: '80%',
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
