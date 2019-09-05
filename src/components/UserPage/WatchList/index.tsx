import {
	addToWatchlist,
	removeFromWatchlist,
	updateWatchlistItem
} from './actions';
import { fetchUserWatchList } from '../../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import { Picker, ScrollView } from 'react-native';
import Spinner from '../../Spinner/Spinner';
import WatchList from './WatchList';

interface IProps {
	watchList?: null | Array<any>;
	error: null | Error;
	loading: boolean;
	fetchUserWatchList: (userId) => any;
	addToWatchlist: (movieId, userId) => any;
	removeFromWatchlist: (id, userId) => any;
	updateWatchlistItem: (id, userId) => any;
	userId: string;
}

interface IState {
	filter: string;
}

class WatchListComponent extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = { filter: 'all' };
	}
	componentDidMount() {
		const { userId, fetchUserWatchList } = this.props;
		fetchUserWatchList(userId);
	}
	filterList(list, filter) {
		if (filter === 'all') return list;
		return list.filter(item => item.status === filter);
	}

	render() {
		const {
			watchList,
			userId,
			loading,
			removeFromWatchlist,
			updateWatchlistItem
		} = this.props;
		const { filter } = this.state;

		return loading ? (
			<Spinner />
		) : (
			<>
				<Picker
					selectedValue={filter}
					style={{ height: 50, width: 200, marginLeft: 5 }}
					onValueChange={itemValue => this.setState({ filter: itemValue })}
				>
					<Picker.Item value="all" label="All" />
					<Picker.Item value="to_watch" label="To watch" />
					<Picker.Item value="watched" label="Watched" />
				</Picker>
				<WatchList
					watchList={this.filterList(watchList, filter) || []}
					removeFromWatchlist={removeFromWatchlist}
					updateWatchlistItem={updateWatchlistItem}
					userId={userId}
				/>
			</>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	watchList: rootState.watchList.data,
	error: rootState.watchList.error,
	loading: rootState.watchList.loading,
	userId: rootState.authorization.profileInfo.id
});

const actions = {
	fetchUserWatchList,
	addToWatchlist,
	removeFromWatchlist,
	updateWatchlistItem
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WatchListComponent);
