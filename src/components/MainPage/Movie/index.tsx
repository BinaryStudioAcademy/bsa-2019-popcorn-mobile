import { fetchMovies } from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatList } from 'react-native'
import React from 'react';
import MoviePreview from './MoviePreview/MoviePreview';
import IMovie from './IMovie';


interface IProps {
    movies?: null | Array<IMovie>;
    error: null | Error;
    loading: boolean;
    fetchMovies: () => any;
}

class MovieComponent extends React.Component<IProps> {
    componentDidMount() {
        this.props.fetchMovies();
    }

    renderMovie({ item }){
        return (
            <MoviePreview movie={item}/>
        );
    }

    render() {
        const { movies } = this.props;
        return (
            movies && (
                <FlatList
                    refreshing={false}
                    data={movies}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => this.renderMovie({ item })}
                />
            )
        );
    }
};

const mapStateToProps = (rootState, props) => ({
    ...props,
    movies: rootState.post.posts,
    error: rootState.post.error,
    loading: rootState.post.loading,
});

const actions = {
    fetchMovies,
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieComponent);