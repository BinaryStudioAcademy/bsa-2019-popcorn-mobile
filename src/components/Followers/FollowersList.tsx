import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFollowers } from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import styles from './ListStyles';
import Item from './FollowListItem';

interface IProps {
	followers: any;
	fetchFollowers: (id: string) => void;
	selectedUser: any;
	loading: boolean;
	navigation: any;
}

class followersList extends Component<IProps> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchFollowers(this.props.selectedUser.id);
	}

	render() {
		if (this.props.loading || !this.props.followers) return <Spinner />;

		return (
			<View style={styles.mainContainer}>
				<FlatList
					refreshing={false}
					data={this.props.followers}
					keyExtractor={(item: any) => item.id}
					renderItem={({ item }) => (
						<Item item={item} navigation={this.props.navigation} />
					)}
				/>
			</View>
		);
	}
}

const actions = {
	fetchFollowers
};

const mapStateToProps = (rootState, props) => ({
	...props,
	followers: rootState.followers.followers,
	loading: rootState.followers.loading,
	selectedUser: rootState.userProfile.selectedUser
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(followersList);
