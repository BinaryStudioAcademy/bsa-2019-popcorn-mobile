import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { analysisToGRBA } from '../../helpers/analysisToGRBA';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReviewsByMovieId, setReviewReaction } from '../../redux/routines';
import SvgUri from 'react-native-svg-uri';
import * as LikeIcon from '../../assets/general/like.svg';
import * as DislikeIcon from '../../assets/general/dislike.svg';
import * as RightArrowIcon from '../../assets/general/right-arrow.svg';
interface IProps {
	movieId: string;
}

interface IState {}

class ReviewItem extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			create: moment(this.props.data.created_at).format('D-MMM-HH:mm'),
			full: false
		};
	}

	showMore() {
		this.setState({
			full: !this.state.full
		});
	}

	sendReactionToAction = (isLike: boolean) => {
		const reviewId = this.props.data.id;
		const userId = this.props.data.user.id;
		if (userId === this.props.currentUser) return;
		this.props.setReviewReaction({ reviewId, isLike });
		this.props.getReviewsByMovieId(this.props.movieId);
	};

	render() {
		const { data, updateReaction } = this.props;
		const { text, user, created_at, analysis, reaction } = data;
		const analysisRBGA = analysisToGRBA(analysis);

		return (
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					alignItems: 'flex-start',
					marginBottom: 30,
					paddingBottom: 15
				}}
			>
				<View style={styles.reviewHeader}>
					<View style={styles.reviewUser}>
						<Image
							source={{
								uri:
									user.avatar ||
									'https://blog.hootsuite.com/wp-content/uploads/2017/06/social-media-content-calendar-940x470.jpg'
							}}
							style={{ width: 30, height: 30, marginRight: 10 }}
						/>
						<View>
							<Text>{user.name}</Text>
							<Text style={styles.reviewDate}>{this.state.create}</Text>
						</View>
					</View>
					<View style={styles.reviewReact}>
						<TouchableOpacity
							style={styles.reviewIcon}
							onPress={() => this.sendReactionToAction(true)}
						>
							<SvgUri height={12} width={12} svgXmlData={LikeIcon} />

							<Text>{reaction.countLikes}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.reviewIcon}
							onPress={() => this.sendReactionToAction(false)}
						>
							<SvgUri height={12} width={12} svgXmlData={DislikeIcon} />
							<Text>{reaction.countDislikes}</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View
					style={this.state.full ? styles.reviewTextFull : styles.reviewText}
				>
					<Text
						style={{ borderWidth: 3, borderColor: analysisRBGA, padding: 10 }}
					>
						{text}
					</Text>
				</View>
				<View style={styles.reviewFooter}>
					{text.length > 410 ? (
						<TouchableOpacity
							style={styles.reviewRead}
							onPress={() => this.showMore()}
						>
							<Text>{this.state.full ? 'Hide' : 'Read more...'}</Text>
							<SvgUri height={10} width={10} svgXmlData={RightArrowIcon} />
						</TouchableOpacity>
					) : null}
				</View>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props
});

const actions = {
	getReviewsByMovieId,
	setReviewReaction
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReviewItem);

const styles = StyleSheet.create({
	reviewFooter: {
		display: 'flex',
		justifyContent: 'flex-end',
		flexDirection: 'row',
		width: '100%'
	},
	reviewIcon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 10
	},
	item: {
		marginRight: 5
	},
	reviewReact: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	reviewUser: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	reviewHeader: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		width: '100%',
		marginBottom: 15,
		justifyContent: 'space-between'
	},
	reviewDate: {
		alignItems: 'flex-end',
		color: 'grey',
		width: '100%',
		fontStyle: 'italic',
		fontSize: 12
	},
	reviewRead: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row'
	},
	reviewText: {
		maxHeight: 120,
		overflow: 'hidden',
		lineHeight: 24,
		fontSize: 16,
		marginBottom: 15,
		display: 'flex',
		flexDirection: 'row'
	},
	reviewTextFull: {
		lineHeight: 24,
		fontSize: 16,
		marginBottom: 30,
		display: 'flex',
		flexDirection: 'row'
	}
});
