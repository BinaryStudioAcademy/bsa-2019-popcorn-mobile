import React, { Component } from 'react';
import { AppNavigator } from '../routes/index';
import NavigationService from '../services/navigation.service';
import { Storage } from '../helpers/storage.helper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/routines';
import SocketHelper from '../helpers/socket.helper';

type userInfo = {
	id: string;
	name: string;
	image: string;
	any;
};
interface IProps {
	isAuthorized: boolean;
	fetchUser: (string) => void;
	userInfo: userInfo | null;
}

class Root extends Component<IProps> {
	componentDidMount() {
		Storage.get('token').then(value => {
			if (value && !this.props.isAuthorized) {
				this.props.fetchUser(value);
			} else if (value && this.props.isAuthorized)
				NavigationService.navigate('Main');
			else NavigationService.navigate('Auth');
		});
	}

	componentDidUpdate(prevProps) {
		Storage.get('token').then(value => {
			if (prevProps.isAuthorized !== this.props.isAuthorized) {
				if (value) NavigationService.navigate('Main');
				else NavigationService.navigate('Auth');
			}
		});
	}

	render() {
		const { userInfo } = this.props;
		if (userInfo) new SocketHelper(userInfo.id);
		return (
			<AppNavigator
				ref={navigatorRef => {
					NavigationService.setTopLevelNavigator(navigatorRef);
				}}
			/>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	isAuthorized: !!rootState.authorization.profileInfo,
	userInfo: rootState.authorization.profileInfo
});

const actions = {
	fetchUser
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Root);
