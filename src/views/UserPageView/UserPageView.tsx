import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Test1 from './Test1'; //Tried Animated React Native
import Spinner from '../../components/Spinner/Spinner';
import { View } from 'react-native';
import {
	fetchUserById,
	clearUserInfo,
	fetchFollowedCount,
	fetchFollowersCount,
	fetchStatus
} from '../../redux/routines';

interface IProps {
	navigation: any;
	fetchUserById: (id: string) => any;
	currentUser: any;
	loading: boolean;
	selectedProfileInfo: any;
	clearUserInfo: () => void;
	fetchFollowedCount: (id: string) => void;
	fetchFollowersCount: (id: string) => void;
	fetchStatus: (obj: { userId: string; followerId: string }) => void;
}

class UserPageView extends Component<IProps> {
	constructor(props) {
		super(props);
		this.didBlurSubscribe();
	}

	didBlurSubscribe = () => {
		this.props.navigation.addListener('didFocus', () => {
			let id;
			const { currentUser, selectedProfileInfo } = this.props;
			const params = this.props.navigation
				.dangerouslyGetParent()
				.dangerouslyGetParent().state.params;

			if (!params) id = currentUser.id;
			else id = params.userId;
			if (selectedProfileInfo.id !== id) {
				this.props.fetchUserById(id);
				this.props.fetchFollowedCount(id);
				this.props.fetchFollowersCount(id);
				if (this.props.currentUser.id !== id)
					this.props.fetchStatus({ userId: currentUser.id, followerId: id });
			}
		});
	};

	render() {
		if (this.props.loading) return <Spinner />;
		return (
			/* 			<Test4 />
			 */ <Test1 navigation={this.props.navigation} />
			// <Test3/>
		);
	}
}
const mapStateToProps = (rootState, props) => ({
	currentUser: rootState.authorization.profileInfo,
	loading: rootState.userProfile.loading,
	selectedProfileInfo: rootState.userProfile.selectedUser
});

const actions = {
	fetchUserById,
	clearUserInfo,
	fetchFollowedCount,
	fetchFollowersCount,
	fetchStatus
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserPageView);
