import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
import { getReviewsByMovieId } from '../../redux/routines';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReviewItem from '../ReviewItem/ReviewItem';
import config from '../../config';

interface IProps {}

interface IState {}

class ReviewPage extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.getReviewsByMovieId();
	}

	render() {
		const { reviews } = this.props;
		console.log(reviews);

		return (
			<ScrollView style={styles.container}>
				<View style={styles.header}>
					<Image
						source={{
							uri:
								config.POSTER_PATH + reviews.movie.poster_path ||
								'https://blog.hootsuite.com/wp-content/uploads/2017/06/social-media-content-calendar-940x470.jpg'
						}}
						style={{
							width: 50,
							height: 100,
							marginRight: 30
						}}
					/>

					<Text style={styles.title}>{reviews.movie.title}</Text>
					{/* <Text style={styles.desc}>{reviews.movie.overview}</Text> */}
				</View>

				{reviews.reviews.map((item, i) => (
					<ReviewItem
						key={`rw${i}`}
						data={item}
						// movieId={this.props.navigation.state.params.id}
						currentUser={this.props.authorization.id}
					/>
				))}
			</ScrollView>
		);
	}
}

export default ReviewPage;

const mapStateToProps = (rootState, props) => ({
	...props,
	reviews: rootState.reviews.reviews,
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
		paddingTop: 30,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 45
	},
	header: {
		borderBottomColor: 'grey',
		paddingBottom: 30,
		borderBottomWidth: 2,
		marginBottom: 30,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row'
	},
	title: {
		fontSize: 21,
		fontWeight: '500',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 15
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
