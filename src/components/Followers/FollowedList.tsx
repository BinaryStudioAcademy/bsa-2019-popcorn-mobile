import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFollowed } from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import styles from './ListStyles';
import Item from './FollowListItem';

interface IProps {
	followed: any;
	fetchFollowed: (id: string) => void;
	selectedUser: any;
	loading: boolean;
	navigation: any;
}

class followedList extends Component<IProps> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchFollowed(this.props.selectedUser.id);
	}

	render() {
		if (this.props.loading || !this.props.followed) return <Spinner />;

		return (
			<View style={styles.mainContainer}>
				<FlatList
					refreshing={false}
					data={this.props.followed}
					keyExtractor={(item: any) => item.id}
					renderItem={({ item }) => (
						<Item navigation={this.props.navigation} item={item} />
					)}
				/>
			</View>
		);
	}
}

const actions = {
	fetchFollowed
};

const mapStateToProps = (rootState, props) => ({
	...props,
	followed: rootState.followers.followed,
	loading: rootState.followers.loading,
	selectedUser: rootState.userProfile.selectedUser
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(followedList);
