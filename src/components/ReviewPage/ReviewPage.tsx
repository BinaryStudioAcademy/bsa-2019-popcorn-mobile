import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	TouchableOpacity
} from 'react-native';
import { getReviewsByMovieId } from '../../redux/routines';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReviewItem from '../ReviewItem/ReviewItem';
import Spinner from '../Spinner/Spinner';
import SvgUri from 'react-native-svg-uri';
import * as BackIcon from '../../assets/general/back.svg';
import * as OptionsIcon from '../../assets/general/options.svg';
interface IProps {}

interface IState {}

class ReviewPage extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			showFilter: false,
			data: [],
			filterType: ''
		};
	}

	componentDidMount() {
		const movieId = this.props.navigation.state.params.id;

		this.props.getReviewsByMovieId(movieId);
		this.setState({
			data: this.props.reviews.reviews
		});
	}

	toggleFilter() {
		this.setState({
			showFilter: !this.state.showFilter
		});
	}

	setFilter(type) {
		this.setState({
			filterType: type
		});
		this.toggleFilter();
	}

	render() {
		const { reviews, loading, navigation, movie } = this.props;
		if (loading) return <Spinner />;

		switch (this.state.filterType) {
			case 'mostLiked':
				reviews.sort((a, b) => b.reaction.countLikes - a.reaction.countLikes);
				break;
			case 'mostDisliked':
				reviews.sort(
					(a, b) => b.reaction.countDislikes - a.reaction.countDislikes
				);
				break;
			case 'fromGood':
				reviews.sort((a, b) => b.analysis - a.analysis);
				break;
			case 'fromBad':
				reviews.sort((a, b) => a.analysis - b.analysis);
				break;
		}

		return (
			<View>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
						}}
					>
						<SvgUri height={20} width={20} svgXmlData={BackIcon} />
					</TouchableOpacity>
					<Text style={styles.title}>{movie.title}</Text>
					<TouchableOpacity
						onPress={() => {
							this.toggleFilter();
						}}
					>
						<SvgUri height={20} width={20} svgXmlData={OptionsIcon} />
					</TouchableOpacity>
				</View>
				{this.state.showFilter ? (
					<View style={styles.filter}>
						<TouchableOpacity
							onPress={() => {
								this.setFilter('fromGood');
							}}
						>
							<Text style={styles.sortItem}>From good to bad</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.setFilter('fromBad');
							}}
						>
							<Text style={styles.sortItem}>From bad to good</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.setFilter('mostLiked');
							}}
						>
							<Text style={styles.sortItem}>Show most liked</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.setFilter('mostDisliked');
							}}
						>
							<Text style={styles.sortItem}>Show most disliked</Text>
						</TouchableOpacity>
					</View>
				) : null}
				<ScrollView style={styles.container}>
					{reviews.length === 0 ? (
						<Text style={styles.empty}>There is no reviews</Text>
					) : (
						<Text style={styles.heading}>Reviews</Text>
					)}
					{reviews.map((item, i) => (
						<ReviewItem
							key={`rw${i}`}
							data={item}
							movieId={this.props.navigation.state.params.id}
							currentUser={this.props.authorization.id}
						/>
					))}
				</ScrollView>
			</View>
		);
	}
}

export default ReviewPage;

const mapStateToProps = (rootState, props) => ({
	...props,
	reviews: rootState.reviews.reviews,
	movie: rootState.movie.movie,
	loading: rootState.reviews.loading,
	authorization: rootState.authorization.profileInfo
});

const actions = {
	getReviewsByMovieId
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReviewPage);

const styles = StyleSheet.create({
	container: {
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: 60
	},
	sortItem: {
		marginBottom: 10
	},
	empty: {
		textAlign: 'center',
		color: 'gray',
		fontStyle: 'italic',
		padding: 30
	},
	filter: {
		position: 'absolute',
		right: 0,
		top: 56,
		zIndex: 9,
		backgroundColor: '#fff',
		padding: 10,
		borderColor: 'gray',
		borderWidth: 1
	},
	heading: {
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 15,
		paddingBottom: 15,
		display: 'flex'
	},
	header: {
		marginBottom: 30,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 15,
		paddingBottom: 15
	},
	title: {
		fontSize: 21,
		fontWeight: '500'
	},
	desc: {
		fontSize: 16,
		display: 'flex'
	},
	descWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row'
	}
});
