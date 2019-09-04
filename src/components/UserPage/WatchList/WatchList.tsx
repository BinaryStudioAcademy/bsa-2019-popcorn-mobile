import React from 'react';
import { FlatList } from 'react-native';
import WatchItem from './WatchItem';

interface IProps {
	watchList: Array<any>;
	removeFromWatchlist: (id, userId) => any;
	updateWatchlistItem: (id, userId) => any;
	userId: string;
}

class WatchList extends React.Component<IProps> {
	renderWatchListItem(item) {
		const { removeFromWatchlist, updateWatchlistItem, userId } = this.props;
		return (
			<WatchItem
				watchItem={item}
				removeFromWatchlist={removeFromWatchlist}
				updateWatchlistItem={updateWatchlistItem}
				userId={userId}
			/>
		);
	}
	render() {
		const { watchList } = this.props;
		return watchList.length ? (
			<FlatList
				style={{ paddingTop: 25 }}
				horizontal={false}
				numColumns={2}
				data={watchList}
				keyExtractor={item => item.id}
				renderItem={({ item }) => this.renderWatchListItem(item)}
			/>
		) : (
			<></>
		);
	}
}

export default WatchList;
