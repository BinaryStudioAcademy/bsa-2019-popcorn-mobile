import { fetchMovies, fetchUserWatchList } from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import React from 'react';
import MoviePreview from './MoviePreview/MoviePreview';
import IMovie from './IMovie';
import { addToWatchlist } from './../../UserPage/WatchList/actions';

interface IProps {
	movies?: null | Array<IMovie>;
	error: null | Error;
	loading: boolean;
	fetchMovies: () => any;
	navigation: any;
	fetchUserWatchList: (userId: string) => any;
	addToWatchlist: (movieId: string, userId: string) => any;
	userId: string;
	watchList: Array<any>;
}

class MovieComponent extends React.Component<IProps> {
	componentDidMount() {
		this.onRefresh();
	}

	onRefresh() {
		const { userId, fetchMovies, fetchUserWatchList } = this.props;
		fetchMovies();
		fetchUserWatchList(userId);
	}
	renderMovie({ item }, navigation) {
		const { watchList, userId, addToWatchlist } = this.props;
		const watchItem = watchList.find(
			watchItem => watchItem.movie.id === item.id
		);
		return (
			<MoviePreview
				movie={
					watchItem
						? { ...item, status: watchItem.status }
						: { ...item, status: undefined }
				}
				navigation={navigation}
				userId={userId}
				addToWatchlist={addToWatchlist}
			/>
		);
	}

	render() {
		const { movies, watchList, navigation } = this.props;
		return (
			movies &&
			watchList && (
				<FlatList
					refreshing={false}
					onRefresh={() => this.onRefresh()}
					data={movies}
					keyExtractor={item => item.id}
					renderItem={({ item }) => this.renderMovie({ item }, navigation)}
				/>
			)
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	movies: rootState.movies.movies,
	error: rootState.movies.error,
	loading: rootState.movies.loading,
	watchList: rootState.watchList.data,
	userId: rootState.authorization.profileInfo.id
});

const actions = {
	fetchMovies,
	fetchUserWatchList,
	addToWatchlist
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieComponent);
