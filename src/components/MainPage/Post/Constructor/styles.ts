import { StyleSheet } from 'react-native';

const orange = '#ffab07';
export default StyleSheet.create({
	input: {
		width: '80%',
		margin: 20,
		borderColor: 'rgba(0, 0, 0, 0.11)',
		borderWidth: 1,
		padding: 12,
		paddingLeft: 15,
		fontSize: 16,
		borderRadius: 3,
		height: 100
	},
	iconsWrp: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 5
	},
	roundImage: {
		height: 200,
		borderRadius: 20,
		backgroundColor: '#adadad'
	},
	extraItemWrp: {
		width: '100%',
		alignItems: 'center',
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
		width: '100%'
	},
	button: {
		width: '100%',
		height: 37,
		backgroundColor: '#FF6501',
		marginTop: 22,
		borderRadius: 55,
		textAlign: 'center',
		lineHeight: 36,
		fontSize: 18,
		color: 'white',
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
		marginTop: 10,
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
		width: '85%',
		marginLeft: 'auto',
		marginRight: 'auto'
	}
});
