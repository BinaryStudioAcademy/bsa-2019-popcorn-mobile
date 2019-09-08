import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ISelectedProfileInfo from './SelectedProfileInterfase';
import { changeStatus } from '../../redux/routines';
import { styles } from './styles';
import { NavigationActions } from 'react-navigation';

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
};

interface IProfileComponentState {
	errorMsg?: string;
}

const favMovies: Array<{ id: string; movie: string }> = [
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'Cloud Atlas'
	},
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'V for Vendetta '
	},
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'Donnie Darko '
	},
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'The Talented Mr. Ripley '
	}
];

const favShows: Array<{ id: string; movie: string }> = [
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'Stranger Things '
	},
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'Breaking Bad'
	},
	{
		id: Math.random() * (9000 - 1) + 1 + '',
		movie: 'Black Mirror'
	}
];

const mockProfileInfo = {
	name: 'Meredith',
	location: 'Kyiv',
	aboutMe: 'About me',
	male: false,
	female: true,
	mockAvatar:
		'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png',
	id: 1
};

class UserProfileView extends Component<IProfileProps> {
	constructor(props: IProfileProps) {
		super(props);
	}

	isCurrent = () => {
		return this.props.currentUser.id === this.props.selectedProfileInfo.id;
	};

	render() {
		let { mockAvatar } = mockProfileInfo;
		let { location } = this.props.selectedProfileInfo;
		if (!location) {
			location = mockProfileInfo.location;
		}
		let {
			male,
			female,
			name,
			avatar,
			aboutMe,
			favoriteLists
		} = this.props.selectedProfileInfo;
		if (!male && !female) {
			female = true;
		}

		if (!location) {
			location = 'Kyiv';
		}
		console.log(
			'this.props.selectedProfileInfo',
			this.props.selectedProfileInfo
		);
		return (
			<View style={styles.profileWrap}>
				<View style={styles.userInfo}>
					<Image
						source={{
							uri: avatar || mockAvatar
						}}
						style={styles.profileImg}
					/>
					<View style={styles.userMainInfo}>
						<View style={styles.mainWrap}>
							<View style={styles.userPersonal}>
								<Text style={styles.userName}>{name}</Text>
								{male && (
									<FontAwesome5
										name="mars-stroke"
										color={'#000'}
										size={20}
										style={styles.userIcon}
									/>
								)}
								{female && (
									<FontAwesome5
										name="venus"
										color={'#000'}
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
							<View style={styles.followBlock}>
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
										{!this.props.followStatus.isFollowing &&
											!this.props.followStatus.isFollower && (
												<Text style={[styles.bttnText, styles.followBttnText]}>
													Follow
												</Text>
											)}
										{!this.props.followStatus.isFollowing &&
											this.props.followStatus.isFollower && (
												<Text style={[styles.bttnText, styles.followBttnText]}>
													Follow back
												</Text>
											)}
									</TouchableOpacity>
								)}
							</View>
						</View>
					</View>
				</View>
				<View style={styles.userAbout}>
					<Text style={styles.userSubtitle}>{aboutMe || '-'}</Text>
				</View>
				<View style={styles.userFavorites}>
					<Text style={styles.userFavSubtitle}>Movies: </Text>
					<View style={styles.userMoviesWrap}>
						{favoriteLists && favoriteLists.length > 0
							? favoriteLists.map(movie => (
									<Text key={movie.movie.id} style={styles.userMovies}>
										{movie.movie.name}
									</Text>
							  ))
							: '-'}
					</View>
				</View>
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
