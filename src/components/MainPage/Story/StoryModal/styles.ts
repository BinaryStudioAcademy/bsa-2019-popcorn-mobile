import { StyleSheet } from 'react-native';

const orange = '#ffab07';
const imageHeight = 200;
export default StyleSheet.create({
	input: {
		width: 200,
		borderColor: 'rgba(0, 0, 0, 0.11)',
		borderWidth: 1,
		fontSize: 16,
		borderRadius: 3,
		height: 50
	},
	colorIcon: {
		width: 35,
		height: 35,
		overflow: 'hidden'
	},
	iconsWrp: {
		width: 250,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 5
	},
	sendInputWrp: {
		width: 250,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 5
	},
	roundImage: {
		// height: imageHeight,
		// borderRadius: 20,
		marginTop: 0,
		marginBottom: 0,
		position: 'relative'
	},
	deleteImageIcon: {
		position: 'absolute',
		top: 10,
		left: 10
	},
	extraItemWrp: {
		width: '100%',
		alignItems: 'flex-start',
		backgroundColor: '#f2f2f2',
		flex: 1
	},
	extraItem: {
		width: 200,
		borderColor: orange,
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		fontSize: 18,
		marginBottom: 10,
		justifyContent: 'center',
		flexDirection: 'row',
		display: 'flex'
	},
	sendWrap: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20
	},
	buttonWrp: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		width: 160,
		height: 37,
		backgroundColor: '#FF6501',
		marginTop: 22,
		borderRadius: 20,
		textAlign: 'center',
		lineHeight: 36,
		fontSize: 18,
		color: 'white',
		fontFamily: 'Inter-SemiBold'
	},
	mainView: {
		marginTop: 10,
		width: 300,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flex: 1
	},
	extra: {
		marginTop: 5,
		marginRight: 25,
		marginBottom: 15,
		marginLeft: 25,
		borderLeftWidth: 5,
		borderColor: 'rgba(0, 0, 0, 0.11)',
		padding: 15,
		display: 'flex',
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
		backgroundColor: '#efd69a'
	},
	UploadWrp: {
		width: 200,
		height: 300,
		marginTop: 20,
		// flex: 1,
		// alignItems: 'center',
		justifyContent: 'center'
		// marginLeft: 'auto',
		// marginRight: 'auto',
	},
	bigFont: {
		fontSize: 16.5
	},
	visitors: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '20%',
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
		marginBottom: 3,
		width: '75%'
	},
	horizontalContainer: {
		width: '100%',
		display: 'flex',
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
		alignItems: 'center',
		height: imageHeight
	},
	grid: {
		paddingTop: 15,
		width: '100%',
		flex: 1
	}
});
