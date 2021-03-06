import React, { Component } from 'react';
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity
} from 'react-native';
import IPost from './../IPost';
import config from '../../../../config';
import SvgUri from 'react-native-svg-uri';
const { width } = Dimensions.get('window');
import SettingsModal from './../SettingsModal';
import ReactionsModal from './../Reactions';
import { getIcon } from './../../../../services/postReaction.service';
import CommentsModal from './../CommentsModal';
import Moment from 'moment';
import * as SettingsIcon from './../../../../assets/general/settings.svg';
import * as LikeIcon from './../../../../assets/general/likeIcon.svg';
import * as CommentIcon from './../../../../assets/general/commentIcon.svg';
interface IPostProps {
	post: IPost;
	navigation: any;
	isCreator: boolean;
	userId: string;
	deletePost: (postId: string) => any;
	reactPost: (type: string, userId: string, postId: string) => any;
	prevScreen: string;
}

interface IState {
	showSettingsModal: boolean;
	showReactionsModal: boolean;
	showCommentsModal: boolean;
}

class Post extends Component<IPostProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			showSettingsModal: false,
			showReactionsModal: false,
			showCommentsModal: false
		};
		this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
		this.toggleReactionsModal = this.toggleReactionsModal.bind(this);
		this.toggleCommentsModal = this.toggleCommentsModal.bind(this);
	}

	toggleSettingsModal() {
		const { showSettingsModal } = this.state;
		this.setState({
			showSettingsModal: !showSettingsModal,
			showReactionsModal: false,
			showCommentsModal: false
		});
	}

	toggleReactionsModal() {
		const { showReactionsModal } = this.state;
		this.setState({
			showReactionsModal: !showReactionsModal,
			showSettingsModal: false,
			showCommentsModal: false
		});
	}

	toggleCommentsModal() {
		const { showCommentsModal } = this.state;
		this.setState({
			showReactionsModal: false,
			showSettingsModal: false,
			showCommentsModal: !showCommentsModal
		});
	}

	countReactionsSum(reactions) {
		return reactions
			.map(item => +item.count)
			.reduce((acc, val) => acc + val, 0);
	}

	parseDescription(description) {
		const arr = description.split('@');
		const res = arr.map(str => str.replace(/(.+)\{(.+)\}/, '$2'));
		return res.join('');
	}

	getActivityBlock(reactions, comments) {
		return (
			<View style={styles.activityWrapper}>
				{reactions.map((item, i) => (
					<View style={i !== 0 && styles.reactionWrapper}>
						{getIcon(item.type, 23)}
					</View>
				))}
				{reactions && !!reactions.length && (
					<Text style={styles.activityTitle}>
						{this.countReactionsSum(reactions)} reactions
					</Text>
				)}
				{!!comments.length && (
					<Text style={[styles.activityTitle, styles.activityTitleLeft]}>
						{comments.length} comments
					</Text>
				)}
			</View>
		);
	}

	render() {
		const { isCreator, deletePost, reactPost, userId } = this.props;
		const {
			image_url,
			description,
			createdAt,
			id: postId,
			reactions,
			comments
		} = this.props.post;
		const { id, name, avatar } = this.props.post.user;
		const {
			showSettingsModal,
			showReactionsModal,
			showCommentsModal
		} = this.state;
		return (
			<>
				<View style={styles.postWrapper}>
					{showSettingsModal && (
						<SettingsModal
							deletePost={deletePost}
							postId={postId}
							toggleModal={this.toggleSettingsModal}
						/>
					)}
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.navigate('UserPage', { userId: id })
						}
					>
						<View style={styles.postHeader}>
							<Image
								style={styles.roundImage}
								source={{ uri: avatar || config.DEFAULT_AVATAR }}
							/>
							<View>
								<Text style={styles.userName}>{name}</Text>
								<Text style={styles.info}>
									{Moment(createdAt).format('D MMM HH:mm')}
								</Text>
							</View>
							{isCreator && (
								<View style={styles.headerControl}>
									<TouchableOpacity onPress={() => this.toggleSettingsModal()}>
										<SvgUri height={5} width={20} svgXmlData={SettingsIcon} />
									</TouchableOpacity>
								</View>
							)}
						</View>
					</TouchableOpacity>
					{!!image_url && (
						<View style={styles.imageWrapper}>
							<Image
								style={styles.postImage}
								source={{ uri: image_url }}
								resizeMode="contain"
							/>
						</View>
					)}
					<View style={styles.postBody}>
						<Text>{this.parseDescription(description)}</Text>
					</View>
					{(reactions || comments) &&
						this.getActivityBlock(reactions, comments)}
					<View style={styles.postControls}>
						<View style={styles.postControlsItem}>
							{showReactionsModal && (
								<ReactionsModal
									userId={userId}
									postId={postId}
									reactPost={reactPost}
									toggleModal={this.toggleReactionsModal}
								/>
							)}
							<TouchableOpacity onPress={() => this.toggleReactionsModal()}>
								<SvgUri height={22} width={22} svgXmlData={LikeIcon} />
							</TouchableOpacity>
						</View>
						{showCommentsModal && (
							<CommentsModal
								toggleModal={this.toggleCommentsModal}
								userId={userId}
								postId={postId}
								comments={comments || []}
								navigation={this.props.navigation}
								prevScreen={this.props.prevScreen}
							/>
						)}
						<View style={styles.postControlsItem}>
							<TouchableOpacity onPress={() => this.toggleCommentsModal()}>
								<SvgUri height={22} width={22} svgXmlData={CommentIcon} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	postWrapper: {
		position: 'relative',
		width: width,
		backgroundColor: '#FFFFFF',
		marginVertical: 8
	},
	postHeader: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	headerControl: {
		marginLeft: 'auto',
		marginRight: 9
	},
	postImage: {
		height: 300,
		width: width
	},
	imageWrapper: {
		flex: 1,
		backgroundColor: 'rgb(239, 239, 239)',
		marginBottom: 5
	},
	postBody: {
		marginHorizontal: 8,
		paddingVertical: 5,
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		lineHeight: 18,
		letterSpacing: 0.4,
		color: 'rgba(18, 39, 55, 0.7)'
	},
	postControls: {
		marginHorizontal: 8,
		flexDirection: 'row'
	},
	postControlsItem: {
		marginHorizontal: 5
	},
	shareControl: {
		marginLeft: 'auto'
	},
	info: {
		fontFamily: 'Inter-Regular',
		fontSize: 10,
		lineHeight: 12,
		letterSpacing: 0.4,
		color: 'rgba(18, 39, 55, 0.7)'
	},
	userName: {
		fontFamily: 'Inter-Bold',
		fontSize: 13,
		lineHeight: 15,
		letterSpacing: 0.4,
		color: 'rgb(18, 39, 55)'
	},
	roundImage: {
		width: 35,
		height: 35,
		borderRadius: 20,
		margin: 9,
		backgroundColor: '#adadad'
	},
	activityWrapper: {
		marginHorizontal: 8,
		marginVertical: 8,
		flexDirection: 'row',
		alignItems: 'center'
	},
	reactionWrapper: {
		position: 'relative',
		marginLeft: -6
	},
	activityTitle: {
		marginLeft: 6,
		fontFamily: 'Inter-Regular',
		fontSize: 15,
		lineHeight: 17,
		letterSpacing: 0.4,
		color: 'rgba(18, 39, 55, 0.7)'
	},
	activityTitleLeft: {
		marginLeft: 'auto'
	}
});
export default Post;
