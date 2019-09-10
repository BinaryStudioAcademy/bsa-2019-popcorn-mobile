import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ISelectedProfileInfo from './SelectedProfileInterfase';
import { changeStatus } from '../../redux/routines';
import { styles } from './styles';
import { NavigationActions } from 'react-navigation';
import config from '../../config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createChat } from '../Messages/actions';
import Spinner from '../../components/Spinner/Spinner';

type IProfileProps = {
	profileInfo: ISelectedProfileInfo;
	uploadAvatar?: (FormData, string) => any;
	uploadUrl?: string;
	cancelAvatar?: () => any;
	setAvatar?: (url: string, id: string) => any;
	selectedProfileInfo: any;
	navigation: any;
	followedCount: number;
	followersCount: number;
	followStatus: any;
	currentUser: ISelectedProfileInfo;
	changeStatus: (obj: { userId: string; followerId: string }) => void;
	updateProfileHeight: (number) => void;
	chats: any;
	createChat: (userId1: string, chatId2: string, newMessage: any) => void;
};

interface IState {
	userRedirect: boolean;
}

class UserProfileView extends Component<IProfileProps, IState> {
	constructor(props: IProfileProps) {
		super(props);
		this.state = {
			userRedirect: false
		};
	}

	isCurrent = () => {
		return this.props.currentUser.id === this.props.selectedProfileInfo.id;
	};

	getChatId = id => {
		for (const chatId in this.props.chats) {
			if (this.props.chats[chatId].user.id === id) {
				return chatId;
			}
		}
	};

	createNewChat = () => {
		const chatId = this.getChatId(this.props.selectedProfileInfo.id);
		if (!chatId) {
			this.props.createChat(
				this.props.currentUser.id,
				this.props.selectedProfileInfo.id,
				''
			);
			this.setState({ userRedirect: true });
		} else {
			this.props.navigation.navigate('Messages', {
				chatId
			});
		}
	};
	render() {
		if (this.state.userRedirect && this.props.newChatId) {
			this.setState({ userRedirect: false });
			this.props.navigation.navigate('Messages', {
				chatId: this.props.newChatId
			});
			return <Spinner />;
		}
		let { location } = this.props.selectedProfileInfo;
		if (!location) {
			location = 'Kyiv';
		}
		let {
			male,
			female,
			name,
			avatar,
			aboutMe,
			favoriteLists
		} = this.props.selectedProfileInfo;

		if (!location) {
			location = 'Kyiv';
		}
		return (
			<View
				style={styles.profileWrap}
				onLayout={({
					nativeEvent: {
						layout: { height }
					}
				}) => {
					this.props.updateProfileHeight(height);
				}}
			>
				<View style={styles.userInfo}>
					<View style={styles.userWrap}>
						<View style={styles.imageWrap}>
							<Image
								source={{
									uri: avatar || config.DEFAULT_AVATAR
								}}
								style={styles.profileImg}
							/>
							<View style={styles.mainWrap}>
								<View style={styles.userPersonal}>
									<Text style={styles.userName}>{name}</Text>
									{male && (
										<FontAwesome5
											name="mars-stroke"
											size={20}
											style={styles.userIcon}
										/>
									)}
									{female && (
										<FontAwesome5
											name="venus"
											size={20}
											style={styles.userIcon}
										/>
									)}
								</View>
								{location && (
									<View>
										<Text style={styles.userLocation}>{location}</Text>
									</View>
								)}
							</View>
							<View style={styles.horizontalContainer}>
								<TouchableOpacity
									style={styles.followItem}
									onPress={() => {
										this.props.navigation.navigate({
											routeName: 'Follows',
											action: NavigationActions.navigate({
												routeName: 'Followers'
											})
										});
									}}
								>
									<Text style={[styles.followText, styles.followAmount]}>
										{this.props.followersCount}
									</Text>
									<Text style={styles.followText}>followers</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate({
											routeName: 'Follows',
											action: NavigationActions.navigate({
												routeName: 'Following'
											})
										});
									}}
								>
									<Text style={[styles.followText, styles.followAmount]}>
										{this.props.followedCount}
									</Text>
									<Text style={styles.followText}>following</Text>
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.horizontalContainerWrap}>
							<View style={styles.userAbout}>
								{aboutMe ? (
									<Text style={styles.userSubtitle}>{aboutMe}</Text>
								) : null}
							</View>
							<View style={styles.followBlock}>
								{!this.isCurrent() && (
									<TouchableOpacity
										onPress={() => {
											this.props.changeStatus({
												userId: this.props.currentUser.id,
												followerId: this.props.selectedProfileInfo.id
											});
										}}
										style={styles.followBttn}
									>
										{this.props.followStatus.isFollowing && (
											<Text style={[styles.bttnText, styles.unfollowBttnText]}>
												Unfollow
											</Text>
										)}
										{!this.props.followStatus.isFollowing && (
											<Text style={[styles.bttnText, styles.followBttnText]}>
												Follow
											</Text>
										)}
									</TouchableOpacity>
								)}
								{!this.isCurrent() && (
									<TouchableOpacity
										onPress={() => {
											//ToDO: create chat
											this.createNewChat();
										}}
										style={styles.messageIconWrap}
									>
										<MaterialCommunityIcons
											name="facebook-messenger"
											size={22}
											style={styles.messageIcon2}
										/>
										<Text style={styles.sendMessage}>Send message</Text>
									</TouchableOpacity>
								)}
							</View>
						</View>
					</View>
				</View>
				{favoriteLists && favoriteLists.length > 0 ? (
					<View style={styles.userFavorites}>
						<Text style={styles.userFavSubtitle}>Movies: </Text>
						<ScrollView contentContainerStyle={styles.userMoviesWrap}>
							{favoriteLists.slice(0, 3).map(movie => (
								<Text key={movie.movie.id} style={styles.userMovies}>
									{movie.movie.name}
								</Text>
							))}
						</ScrollView>
					</View>
				) : null}
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	currentUser: rootState.authorization.profileInfo,
	selectedProfileInfo: rootState.userProfile.selectedUser,
	followersCount: rootState.followers.followersCount,
	followedCount: rootState.followers.followedCount,
	followStatus: rootState.followers.followStatus,
	chats: rootState.chat.chats,
	newChatId: rootState.chat.newChatId
});

const actions = {
	changeStatus,
	createChat
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserProfileView);
