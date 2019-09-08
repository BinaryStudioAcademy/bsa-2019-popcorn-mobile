import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCollectionPreview, deleteCollection } from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import { IMovieListPreview } from './ICollection';
import CollectionListItem from './CollectionsListItem';
import styles from './styles';

interface IProps {
	collections: Array<IMovieListPreview>;
	currentUser: string;
	loading: boolean;
	fetchCollectionPreview: ({ userId: string }) => void;
	selectedUser: string;
	navigation: any;
	deleteCollection: ({ movieListId: string }) => void;
}

class CollectionList extends Component<IProps> {
	componentDidMount() {
		this.props.fetchCollectionPreview({ userId: this.props.selectedUser });
	}

	isOwner = () => {
		return this.props.currentUser === this.props.selectedUser;
	};

	render() {
		if (this.props.loading || !this.props.collections) return <Spinner />;
		return (
			<View style={{ marginTop: 10 }}>
				{this.isOwner() && (
					<TouchableOpacity
						style={styles.addCollectionBttn}
						onPress={() => {
							this.props.navigation.navigate('CollectionConstructor');
						}}
					>
						<Text style={styles.bttnText}>Add collection</Text>
					</TouchableOpacity>
				)}
				<FlatList
					refreshing={true}
					data={this.props.collections}
					keyExtractor={(item: any) => item.id}
					renderItem={({ item }) => (
						<CollectionListItem
							navigation={this.props.navigation}
							preview={item}
							deleteCollection={this.props.deleteCollection}
							isOwner={this.isOwner}
						/>
					)}
				/>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	currentUser: rootState.authorization.profileInfo.id,
	selectedUser: rootState.userProfile.selectedUser.id,
	loading: rootState.collections.loading,
	collections: rootState.collections.movieListsPreview
});

const actions = {
	fetchCollectionPreview,
	deleteCollection
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CollectionList);
