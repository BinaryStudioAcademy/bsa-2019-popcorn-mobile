import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	sidebar: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#ecf0f1'
	},
	homeImg: {
		width: 300,
		height: 200,
		marginTop: 10
	},
	rightSideBarImg: {
		width: 200,
		height: 100,
		marginTop: 10
	},
	imgBackground: {
		width: '100%',
		height: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	home_title: {
		marginBottom: 20,
		lineHeight: 30,
		fontSize: 18
	},
	sidebar_title: {
		marginTop: 10,
		textAlign: 'center'
	},
	header: {
		backgroundColor: 'aliceblue',
		fontSize: 30,
		padding: '2% 2%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 60,
		width: '100%'
	}
});
