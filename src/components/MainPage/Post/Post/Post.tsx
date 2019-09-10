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
import { getNewDateTime } from '../../../../helpers/dateFormat.helper';
const { width } = Dimensions.get('window');
import Modal from './../SettingsModal';
interface IPostProps {
	post: IPost;
	navigation: any;
	isCreator: boolean;
	deletePost: (postId: string) => any;
}

interface IState {
	showModal: boolean;
}

class Post extends Component<IPostProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggleModal() {
		const { showModal } = this.state;
		this.setState({
			showModal: !showModal
		});
	}

	render() {
		const { isCreator, deletePost } = this.props;
		const { image_url, description, createdAt, id: postId } = this.props.post;
		let date;
		if (createdAt) {
			date = new Date(createdAt);
		}
		let newDate = getNewDateTime(date);
		const { id, name, avatar } = this.props.post.user;
		const { showModal } = this.state;
		return (
			<>
				<View style={styles.postWrapper}>
					{showModal && (
						<Modal
							deletePost={deletePost}
							postId={postId}
							toggleModal={this.toggleModal}
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
								<Text style={styles.info}>{createdAt || 'Few days ago'}</Text>
							</View>
							{isCreator && (
								<View style={styles.headerControl}>
									<TouchableOpacity onPress={() => this.toggleModal()}>
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
					<View style={styles.postControls}>
						<View style={styles.postControlsItem}>
							<TouchableOpacity>
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
						<View style={[styles.postControlsItem, styles.shareControl]}>
							<TouchableOpacity>
								<SvgUri
									height={22}
									width={22}
									source={require('./../../../../assets/general/shareIcon.svg')}
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
	}
});
export default Post;
