import { StyleSheet, Platform } from 'react-native';
const HEADER_HEIGHT = Platform.OS === 'ios' ? 20 : 10;
export const ORANGE_POST_CONSTRUCTOR = '#FF6501';

const imageHeight = 200;
export default StyleSheet.create({
	input: {
		marginTop: 10,
		flex: 1,
		borderColor: 'rgba(0, 0, 0, 0.21)',
		borderWidth: 1,
		padding: 10,
		fontSize: 16,
		borderRadius: 3
	},
	cancelBtn: {
		marginLeft: 'auto'
	},
	sendWrap: {
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	sendButton: {
		fontSize: 18,
		backgroundColor: ORANGE_POST_CONSTRUCTOR,
		padding: 8,
		color: '#fff',
		width: '35%',
		textAlign: 'center',
		borderRadius: 19,
		fontFamily: 'Inter-SemiBold'
	},
	inputWrp: {
		height: 70,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	iconsWrp: {
		width: '70%',
		marginTop: 6,
		marginLeft: 'auto',
		marginRight: 'auto',
		alignItems: 'center',
		height: 70,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	roundImage: {
		height: imageHeight,
		borderRadius: 20,
		backgroundColor: '#adadad'
	},
	extraItemWrp: {
		width: '100%',
		alignItems: 'flex-start',
		backgroundColor: '#f2f2f2',
		flex: 1
	},
	extraItem: {
		width: 200,
		borderColor: ORANGE_POST_CONSTRUCTOR,
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		fontSize: 18,
		marginBottom: 10,
		justifyContent: 'center',
		flexDirection: 'row',
		display: 'flex'
	},
	button: {
		width: '80%',
		height: 37,
		color: '#FF6501',
		borderRadius: 55,
		textAlign: 'center',
		lineHeight: 36,
		fontSize: 18,
		fontFamily: 'Inter-SemiBold'
	},
	mainView: {
		padding: 15,
		paddingTop: HEADER_HEIGHT,
		justifyContent: 'space-between',
		flex: 1,
		paddingBottom: 20
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
		width: '100%',
		display: 'flex',
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
		color: '#555',
		backgroundColor: '#dadada'
	},
	UploadWrp: {
		width: '85%',
		marginLeft: 'auto',
		marginRight: 'auto',
		height: imageHeight
	},
	bigFont: {
		fontSize: 16.5,
		width: '90%'
	},
	visitors: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		width: '10%',
		alignSelf: 'flex-start',
		marginRight: 15
	},
	text: {
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		color: '#122737'
	},
	title: {
		fontFamily: 'Inter-SemiBold',
		fontSize: 16,
		marginBottom: 3,
		width: '75%'
	},
	horizontalContainer: {
		width: '100%',
		display: 'flex',
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
		width: '100%',
		alignItems: 'center'
	},
	center: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center'
	},
	grid: {
		paddingTop: 15,
		width: '100%',
		flex: 1
	},
	activity: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 18,
		color: 'white',
		fontFamily: 'Inter-SemiBold'
	},
	colorTextActivity: {
		marginTop: 5,
		color: '#555'
	},
	contentImg: {
		marginRight: 2,
		width: 65,
		height: 65,
		alignItems: 'center'
	},
	contentWrp: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: '100%'
	}
});
