import React, { Component } from 'react';
import { connect } from 'react-redux';

import Test3 from './Test3'; //Tried Pure Parallax Scroll View
import Test4 from './Test4/Test4'; //Tried Animated React Native
import Test1 from './Test1'; //Tried Animated React Native
import { View } from 'react-native';
interface IProps {
	navigation: any;
}
class UserPageView extends Component<IProps> {
	constructor(props) {
		super(props);
	}
	render() {
		return (
/* 			<Test4 />
 */			<Test1/>
			// <Test3/>
		);
	}
}
const mapStateToProps = (rootState, props) => ({
	selectedProfileInfo: rootState.authorization.profileInfo
});

export default connect(mapStateToProps)(UserPageView);
