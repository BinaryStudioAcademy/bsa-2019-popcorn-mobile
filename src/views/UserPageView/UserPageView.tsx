import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Test3 from './Test3'; //Tried Pure Parallax Scroll View
import Test4 from './Test4/Test4'; //Tried Animated React Native
import Test1 from './Test1'; //Tried Animated React Native
import Spinner from '../../components/Spinner/Spinner';
import { View } from 'react-native';
import {
	fetchUserById,
	clearUserInfo
} from '../../redux/routines';

interface IProps {
	navigation: any;
	fetchUserById: (id: string) => any;
	currentUser: any;
	loading: boolean;
	selectedProfileInfo: any;
	clearUserInfo: () => void
}

class UserPageView extends Component<IProps> {
	constructor(props) {
		super(props);
		this.didBlurSubscribe();
	}


	didBlurSubscribe = () => {
		this.props.navigation.addListener(
			'didBlur',
			() => {
				this.props.clearUserInfo();
			}
		);
		this.props.navigation.addListener(
			'didFocus',
			() => {
				const { currentUser } = this.props;
				const params = this.props.navigation.dangerouslyGetParent().state.params;

				if (!params)
				this.props.fetchUserById(currentUser.id);
				else 
				this.props.fetchUserById(params.userId);
			}
		)
	}

	render() {
		if (this.props.loading) return <Spinner />
		return (
			/* 			<Test4 />
			 */ <Test1 />
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
	clearUserInfo
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserPageView);
