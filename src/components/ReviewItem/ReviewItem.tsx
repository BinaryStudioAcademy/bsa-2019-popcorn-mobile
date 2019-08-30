import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { analysisToGRBA } from '../../helpers/analysisToGRBA';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReviewsByMovieId, setReviewReaction } from '../../redux/routines';
import SvgUri from 'react-native-svg-uri';

interface IProps {}

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
		this.props.getReviewsByMovieId();
	};

	render() {
		const { data, updateReaction } = this.props;
		const { text, user, created_at, analysis, reaction } = data;

		const analysisRBGA = analysisToGRBA(analysis);
		return (
			<View
				style={{
					borderColor: analysisRBGA,
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					alignItems: 'flex-start',
					borderWidth: 3,
					marginBottom: 30,
					padding: 15
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
						<Text>{user.name}</Text>
					</View>
					<Text style={styles.reviewDate}>{this.state.create}</Text>
				</View>
				<Text
					style={this.state.full ? styles.reviewTextFull : styles.reviewText}
				>
					{text}
				</Text>
				<View style={styles.reviewFooter}>
					<View style={styles.reviewReact}>
						<TouchableOpacity
							style={styles.reviewIcon}
							onPress={() => this.sendReactionToAction(true)}
						>
							<SvgUri
								style={styles.item}
								height={24}
								width={24}
								source={require('../../assets/general/dislike.svg')}
							/>
							<Text>{reaction.countLikes}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.reviewIcon}
							onPress={() => this.sendReactionToAction(false)}
						>
							<SvgUri
								style={styles.item}
								height={24}
								width={24}
								source={require('../../assets/general/like.svg')}
							/>
							<Text>{reaction.countDislikes}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.reviewBtn}>
						{text.length > 410 ? (
							<TouchableOpacity
								style={styles.reviewRead}
								onPress={() => this.showMore()}
							>
								<Text>{this.state.full ? 'Hide' : 'Read more...'}</Text>
								<SvgUri
									style={styles.item}
									height={10}
									width={10}
									source={require('../../assets/general/right-arrow.svg')}
								/>
							</TouchableOpacity>
						) : null}
					</View>
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
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%'
	},
	reviewIcon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 30
	},
	item: {
		marginRight: 10
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
		alignItems: 'center',
		width: '100%',
		marginBottom: 30,
		justifyContent: 'space-between'
	},
	reviewDate: {
		alignItems: 'flex-end',
		color: 'grey'
	},
	reviewRead: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	reviewText: {
		maxHeight: 220,
		overflow: 'hidden',
		lineHeight: 24,
		fontSize: 16,
		marginBottom: 30
	},
	reviewTextFull: {
		lineHeight: 24,
		fontSize: 16,
		marginBottom: 30
	}
});
