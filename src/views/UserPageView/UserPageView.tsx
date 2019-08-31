import React, { Component } from 'react';
import { connect } from 'react-redux';

import Test1 from './Test1'; //Tried Animated React Native
interface IProps {
	navigation: any;
}
class UserPageView extends Component<IProps> {
	constructor(props) {
		super(props);
	}
	render() {
		return <Test1 />;
	}
}
const mapStateToProps = (rootState, props) => ({
	selectedProfileInfo: rootState.authorization.profileInfo
});

export default connect(mapStateToProps)(UserPageView);
