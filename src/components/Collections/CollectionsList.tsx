import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    fetchCollectionPreview
} from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import { IMovieListPreview } from './ICollection';
import CollectionListItem from './CollectionsListItem';

interface IProps {
    collections: Array<IMovieListPreview>;
    currentUser: string;
    loading: boolean;
    fetchCollectionPreview: ({ userId: string }) => void;
    selectedUser: string;
    navigation: any;
}

class CollectionList extends Component<IProps> {
    componentDidMount() {
        this.props.fetchCollectionPreview({ userId: this.props.selectedUser });
    }

    render() {
        if (this.props.loading || !this.props.collections) return <Spinner />
        return (
            <View>
                {
                    this.props.currentUser === this.props.selectedUser &&
                    <TouchableOpacity onPress={() => { 
                        this.props.navigation.navigate('CollectionConstructor') 
                    }}>
                        <Text>Add collection</Text>
                    </TouchableOpacity>
                }
                <FlatList
                    refreshing={false}
                    data={this.props.collections}
                    keyExtractor={(item: any) => item.id}
                    renderItem={({ item }) =>
                        <CollectionListItem navigation={this.props.navigation} preview={item} />
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = (rootState, props) => ({
    ...props,
    currentUser: rootState.authorization.profileInfo.id,
    selectedUser: rootState.userProfile.selectedUser.id,
    loading: rootState.collections.loading,
	collections: rootState.collections.movieListsPreview,
});

const actions = {
    fetchCollectionPreview
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);