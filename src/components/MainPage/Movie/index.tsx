import {
	fetchMovies,
	fetchUserWatchList,
	fetchFiltred
} from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import React from 'react';
import MoviePreview from './MoviePreview/MoviePreview';
import IMovie from './IMovie';
import { addToWatchlist } from './../../UserPage/WatchList/actions';
import SearchInput from '../../Search/SearchInput';
import { setFilters } from './actions';

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

	convert(newDate) {
		let year = newDate.getFullYear();
		let mnth = ('0' + (newDate.getMonth() + 1)).slice(-2);
		let day = ('0' + newDate.getDate()).slice(-2);
		return [year, mnth, day].join('-');
	}

	handleNameChange = val => {
		const searchName = {
			...this.props.filters,
			nameValue: val
		};
		this.props.setFilters(searchName);
		this.props.fetchFiltred(searchName);
	};

	testEventForQuickShow(data) {
		console.log(data);
	}

	render() {
		const { movies, watchList, navigation } = this.props;
		return (
			<>
				<View style={{ padding: 15 }}>
					<SearchInput
						navigation={navigation}
						action={this.handleNameChange}
						showFilter={true}
						quickEvent={this.testEventForQuickShow}
						quickShowBlock={true}
					/>
				</View>
				movies && watchList && (
				<FlatList
					refreshing={false}
					onRefresh={() => this.onRefresh()}
					data={movies}
					keyExtractor={item => item.id}
					renderItem={({ item }) => this.renderMovie({ item }, navigation)}
				/>
				)
			</>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	movies: rootState.movies.movies,
	filters: rootState.movies.filters,
	error: rootState.movies.error,
	loading: rootState.movies.loading,
	watchList: rootState.watchList.data,
	userId: rootState.authorization.profileInfo.id
});

const actions = {
	fetchMovies,
	fetchUserWatchList,
	addToWatchlist,
	fetchFiltred,
	setFilters
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieComponent);
