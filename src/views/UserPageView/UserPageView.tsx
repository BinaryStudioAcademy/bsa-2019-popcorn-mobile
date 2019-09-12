import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserPage from './UserPage'; //Tried Animated React Native
import Spinner from '../../components/Spinner/Spinner';
import { View } from 'react-native';
import {
	fetchUserById,
	clearUserInfo,
	fetchFollowedCount,
	fetchFollowersCount,
	fetchStatus
} from '../../redux/routines';
import { StackActions, NavigationActions } from 'react-navigation';

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
		console.log('this.props.navigation.state', this.props.navigation.state);
		// const resetAction = StackActions.reset({
		// 		index: 0,
		// 		key: null,
		// 		actions: [NavigationActions.navigate({ routeName: 'UserProfile' })],
		// 	});
		// 	this.props.navigation.dispatch(resetAction);
		if (this.props.loading) return <Spinner />;
		return <UserPage navigation={this.props.navigation} />;
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
