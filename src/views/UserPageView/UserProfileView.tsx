import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ISelectedProfileInfo from './SelectedProfileInterfase';
import { changeStatus } from '../../redux/routines';
import { styles } from './styles';
import { NavigationActions } from 'react-navigation';
import config from '../../config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
};
export let PROFILE_HEIGHT = 0;
class UserProfileView extends Component<IProfileProps> {
	constructor(props: IProfileProps) {
		super(props);
	}

	isCurrent = () => {
		return this.props.currentUser.id === this.props.selectedProfileInfo.id;
	};
	createNewChat = () => {
		// const chatId = this.getChatId(story.user.id);
		// if (!chatId) {
		// 	this.props.createChat(userId, story.user.id, {
		// 		storyId: story && story.id,
		// 		reactionType
		// 	});
		// 	return;
		// }
	};
	render() {
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
					PROFILE_HEIGHT = height;
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
									<View style={styles.locationWrap}>
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
						{aboutMe ? (
							<View style={styles.horizontalContainerWrap}>
								<View style={styles.userAbout}>
									<Text style={styles.userSubtitle}>{aboutMe}</Text>
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
												<Text
													style={[styles.bttnText, styles.unfollowBttnText]}
												>
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
						) : null}
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
	followStatus: rootState.followers.followStatus
});

const actions = {
	changeStatus
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserProfileView);
