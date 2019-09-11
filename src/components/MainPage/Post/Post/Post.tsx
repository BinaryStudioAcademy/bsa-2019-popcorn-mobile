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
import { getNewDateTime } from '../../../../helpers/dateFormat.helper';

interface IPostProps {
	post: IPost;
	navigation: any;
	isCreator: boolean;
	userId: string;
	deletePost: (postId: string) => any;
	reactPost: (type: string, userId: string, postId: string) => any;
}

interface IState {
	showSettingsModal: boolean;
	showReactionsModal: boolean;
}

class Post extends Component<IPostProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			showSettingsModal: false,
			showReactionsModal: false
		};
		this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
		this.toggleReactionsModal = this.toggleReactionsModal.bind(this);
	}

	toggleSettingsModal() {
		const { showSettingsModal } = this.state;
		this.setState({
			showSettingsModal: !showSettingsModal
		});
	}

	toggleReactionsModal() {
		const { showReactionsModal } = this.state;
		this.setState({
			showReactionsModal: !showReactionsModal
		});
	}

	countReactionsSum(reactions) {
		return reactions
			.map(item => +item.count)
			.reduce((acc, val) => acc + val, 0);
	}

	getReactionsBlock(reactions) {
		return (
			<View style={styles.likesWrapper}>
				{reactions.map((item, i) => (
					<View style={i !== 0 && styles.reactionWrapper}>
						{getIcon(item.type, 20)}
					</View>
				))}
				<Text style={styles.sumCount}>
					{this.countReactionsSum(reactions)} reactions
				</Text>
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
			reactions
		} = this.props.post;
		let date = new Date(createdAt || new Date());
		let newDate = getNewDateTime(date);
		const { id, name, avatar } = this.props.post.user;
		const { showSettingsModal, showReactionsModal } = this.state;
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
							<View style={styles.infoBlock}>
								<Text style={styles.userName}>{name}</Text>
								<Text style={styles.info}>{newDate || 'Few days ago'}</Text>
							</View>
							{isCreator && (
								<View style={styles.headerControl}>
									<TouchableOpacity onPress={() => this.toggleSettingsModal()}>
										<SvgUri
											height={5}
											width={20}
											source={require('./../../../../assets/general/settings.svg')}
										/>
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
					{!!reactions.length && this.getReactionsBlock(reactions)}
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
								<SvgUri
									height={22}
									width={22}
									source={require('./../../../../assets/general/likeIcon.svg')}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.postControlsItem}>
							<TouchableOpacity>
								<SvgUri
									height={22}
									width={22}
									source={require('./../../../../assets/general/commentIcon.svg')}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.postBody}>
						<Text>{description}</Text>
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
		padding: 5,
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		lineHeight: 14,
		letterSpacing: 0.4,
		color: 'rgb(18, 39, 55)'
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
	infoBlock: {},
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
	likesWrapper: {
		marginHorizontal: 8,
		marginVertical: 8,
		flexDirection: 'row',
		alignItems: 'center'
	},
	reactionWrapper: {
		position: 'relative',
		marginLeft: -8
	},
	sumCount: {
		marginLeft: 6,
		fontFamily: 'Inter-Regular',
		fontSize: 15,
		lineHeight: 17,
		letterSpacing: 0.4,
		color: 'rgba(18, 39, 55, 0.7)'
	}
});
export default Post;
