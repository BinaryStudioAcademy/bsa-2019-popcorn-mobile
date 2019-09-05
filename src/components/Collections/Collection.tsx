import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    fetchCollectionDetails
} from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import { IMovieListDetails } from './ICollection';

interface IProps {
    navigation: any;
    loading: boolean;
    collection: IMovieListDetails;
    fetchCollectionDetails: ({ movieListId: string }) => void
}

class Collection extends Component<IProps> {
    componentDidMount() {
        this.props.fetchCollectionDetails({ movieListId: this.props.navigation.state.params.id });
    }

    render () {
        const { navigation, loading, collection } = this.props;
        if (loading || !this.props.collection) return <Spinner />
        return (
            <View>
                <Text>{collection.movieList.title}</Text>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Text>Go back</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (rootState, props) => ({
    ...props,
    loading: rootState.collections.loading,
	collection: rootState.collections.movieListDetails,
});

const actions = {
    fetchCollectionDetails
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Collection);