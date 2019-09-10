import { StyleSheet } from 'react-native';

const orange = '#ffab07';
const imageHeight = 200;
export default StyleSheet.create({
	input: {
		width: '90%',
		margin: 20,
		borderColor: 'rgba(0, 0, 0, 0.11)',
		borderWidth: 1,
		padding: 12,
		paddingLeft: 15,
		fontSize: 16,
		borderRadius: 3,
		flex: 1
	},
	iconsWrp: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 5
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
	buttonWrp: {
		width: '85%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		display: 'flex',
		marginLeft: 'auto',
		marginRight: 'auto'
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
		marginTop: 10,
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		flex: 1
	},
	extra: {
		marginTop: 5,
		marginRight: 50,
		marginBottom: 15,
		marginLeft: 15,
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
		color: '#efd69a'
	},
	UploadWrp: {
		width: '85%',
		marginLeft: 'auto',
		marginRight: 'auto',
		height: imageHeight
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
		alignItems: 'center'
	},
	grid: {
		paddingTop: 15,
		width: '100%',
		flex: 1
	},
	activity: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 55,
		lineHeight: 36,
		fontSize: 18,
		color: 'white',
		fontFamily: 'Inter-SemiBold',
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 10
	},
	colorTextActivity: {
		color: '#bccad6'
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
