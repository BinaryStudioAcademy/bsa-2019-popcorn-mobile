import UserNavigator from '../../routes/TabNavigator/UserNavigator';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/Spinner/Spinner';
import { Alert } from 'react-native';

interface IProps {
	match: {
		path: string;
		params: any;
	};
	getSelectedUserInfo: (id: string) => any;
	selectedProfileInfo: any;
}

class UserPageView extends Component<IProps> {
	constructor(props) {
		super(props);
	}
	render() {
		return <UserNavigator />;
	}
}

const mapStateToProps = (rootState, props) => ({
	selectedProfileInfo: rootState.authorization.profileInfo
});

export default connect(mapStateToProps)(UserPageView);
