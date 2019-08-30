import React, { Component, Fragment } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { connect } from 'react-redux';

import PostComponent from '../../components/MainPage/Post';
import { View, Text } from 'native-base';
interface IProps {
	posts?: any;
	getUsersPosts: () => any;
	selectedProfileInfo: any;
}

class UserPosts extends Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}
	render() {
		const { selectedProfileInfo } = this.props;
		const { posts, getUsersPosts } = this.props;
		return (
			<Fragment>
				<View>
					<Text style={{ marginTop: 20, textAlign: 'center' }}>
						{selectedProfileInfo.name}'s posts
					</Text>
				</View>
				<PostComponent userId={selectedProfileInfo.id} />
			</Fragment>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	selectedProfileInfo: rootState.authorization.profileInfo
});

export default connect(mapStateToProps)(UserPosts);
