import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    saveCollection
} from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import { INewMovieList } from './ICollection';

interface IProps {
    navigation: any;
    saveCollection: ({ movieList: INewMovieList }) => void
}

interface IState {
   collection: INewMovieList 
}

class Collection extends Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

    render () {
        const { navigation } = this.props.navigation;
        return (
            <View>
                <Text>constructor</Text>
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
    saveCollection
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Collection);