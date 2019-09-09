import React, { Component } from 'react';
import {
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	View,
	Text,
	StyleSheet
} from 'react-native';
import { DrawerItems, DrawerItemsProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Storage } from '../../../helpers/storage.helper';
import { logout } from '../../../redux/routines';

interface IProps extends DrawerItemsProps {
	logout: (string) => void;
	screenProps: any;
}

class LogoutDrawer extends Component<IProps> {
	onPress = async () => {
		let fcmToken = await Storage.get('fcmToken');

		this.props.screenProps.navigate('Auth');
		this.props.logout(fcmToken);
		await Storage.set('fcmToken', '');
		await Storage.set('token', '');
	};

	render() {
		return (
			<ScrollView
				contentContainerStyle={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'space-between'
				}}
			>
				<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
					<DrawerItems {...this.props} />
				</SafeAreaView>
				<TouchableOpacity onPress={this.onPress}>
					<View style={styles.item}>
						<Text style={styles.label}>Logout</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props
});

const actions = {
	logout
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LogoutDrawer);

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	label: {
		margin: 16,
		fontWeight: 'bold',
		color: 'rgba(0, 0, 0, .87)'
	},
	iconContainer: {
		marginHorizontal: 16,
		width: 24,
		alignItems: 'center'
	},
	icon: {
		width: 24,
		height: 24
	}
});
