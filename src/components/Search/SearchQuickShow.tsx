import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMovies, fetchFiltred } from '../../redux/routines';

interface IProps {
	action?: (data: string) => any;
}

class SearchQuickShow extends React.Component<IProps> {
	componentDidMount() {}

	render() {
		const { movies = [] } = this.props;
		return (
			<View>
				{movies.map(item => (
					<TouchableOpacity
						key={item.id}
						onPress={() => this.props.action(item.id)}
					>
						<Text style={{ padding: 15 }}>{item.title}</Text>
					</TouchableOpacity>
				))}
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	movies: rootState.movies.movies,
	error: rootState.movies.error,
	loading: rootState.movies.loading
});

const actions = {
	fetchMovies,
	fetchFiltred
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchQuickShow);
