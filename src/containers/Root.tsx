import React, { Component } from 'react';
import { AppNavigator } from '../routes/index';
import NavigationService from '../services/navigation.service';
import { Storage } from '../helpers/storage.helper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/routines';
import navigationService from '../services/navigation.service';

interface IProps {
	isAuthorized: boolean;
	fetchUser: (string) => void;
}

class Root extends Component<IProps> {
	componentDidMount() {
		Storage.get('token').then(value => {
			if (value && !this.props.isAuthorized) {
				this.props.fetchUser(value);
			} else if (value && this.props.isAuthorized)
				navigationService.navigate('Main');
			else navigationService.navigate('Auth');
		});
	}

	componentDidUpdate(prevProps) {
		const token = Storage.get('token');
		if (prevProps.isAuthorized !== this.props.isAuthorized) {
			if (token) NavigationService.navigate('Main');
			else NavigationService.navigate('Auth');
		}
	}

	render() {
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
	isAuthorized: !!rootState.authorization.profileInfo
});

const actions = {
	fetchUser
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Root);