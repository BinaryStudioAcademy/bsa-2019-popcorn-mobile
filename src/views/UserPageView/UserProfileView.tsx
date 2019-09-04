import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ISelectedProfileInfo from './SelectedProfileInterfase';
import { changeStatus } from '../../redux/routines';
import style from '../../assets/style';

type IProfileProps = {
	profileInfo: ISelectedProfileInfo;
	uploadAvatar?: (FormData, string) => any;
	uploadUrl?: string;
	cancelAvatar?: () => any;
	setAvatar?: (url: string, id: string) => any;
	selectedProfileInfo: any;
	navigation: any;
	followedCount: number,
	followersCount: number;
	followStatus: any;
	currentUser: ISelectedProfileInfo;
	changeStatus: (obj: { userId: string, followerId: string }) => void;
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
	}

	render() {
		let { location, aboutMe, mockAvatar } = mockProfileInfo;
		let { male, female, name, avatar, id } = this.props.selectedProfileInfo;
		if (!male && !female) {
			female = true;
		}

		if (!location) {
			location = 'Kyiv';
		}
		return (
			<View style={styles.profileWrap}>
				<View style={styles.horizontalContainer}>
					<Image
						source={{
							uri: avatar || mockAvatar
						}}
						style={styles.profileImg}
					/>
					<View style={styles.followBlock}>
						<View style={styles.horizontalContainer}>
							<TouchableOpacity 
								style={styles.followItem}
								onPress={() => { this.props.navigation.navigate('Followers') }}
							>
								<Text style={[styles.followText, styles.followAmount]}>{this.props.followersCount}</Text>
								<Text style={styles.followText}>followers</Text>
							</TouchableOpacity>
							<TouchableOpacity 
								onPress={() => { this.props.navigation.navigate('Followed') }}
							>
								<Text style={[styles.followText, styles.followAmount]}>{this.props.followedCount}</Text>
								<Text style={styles.followText}>following</Text>
							</TouchableOpacity>
						</View>
						{ 
							!this.isCurrent() &&
							<TouchableOpacity 
								onPress={() => { 
									this.props.changeStatus({ 
										userId: this.props.currentUser.id,
										followerId: this.props.selectedProfileInfo.id
									})
								;}}
								style={styles.followBttn}
							>
								{
									this.props.followStatus.isFollowing &&
									<Text style={[styles.bttnText, styles.unfollowBttnText]}>Unfollow</Text>
								}
								{
									!this.props.followStatus.isFollowing &&
									!this.props.followStatus.isFollower &&
									<Text style={[styles.bttnText, styles.followBttnText]}>Follow</Text> 
								}
								{
									!this.props.followStatus.isFollowing &&
									this.props.followStatus.isFollower &&
									<Text style={[styles.bttnText, styles.followBttnText]}>Follow back</Text>
								}
							</TouchableOpacity>
						}
					</View>
				</View>

				<View style={styles.userInfo}>
					<Text style={styles.userName}>{name}</Text>
					<View style={styles.userPersonal}>
						{male && (
							<View style={styles.userIconWrap}>
								<Icon
									name="mars"
									color={'#000'}
									size={14}
									style={styles.userIcon}
								/>
								<Text>Male</Text>
							</View>
						)}
						{female && (
							<View style={styles.userIconWrap}>
								<Icon
									name="venus"
									color={'#000'}
									size={14}
									style={styles.userIcon}
								/>
								<Text>Female</Text>
							</View>
						)}
						{location && (
							<View style={styles.userIconWrap}>
								<Icon
									name="map-marker"
									color={'#000'}
									size={14}
									style={styles.userIcon}
								/>
								<Text>{location}</Text>
							</View>
						)}
					</View>
					<View style={styles.userPersonal}>
						<Text style={styles.userSubtitle}>About: </Text>
						<View>
							<Text>{aboutMe || '-'}</Text>
						</View>
					</View>
					<View style={styles.userFavorites}>
						<Text style={styles.userSubtitle}>Favorite movies: </Text>
						<View style={styles.userMoviesWrap}>
							{favMovies.length > 0
								? favMovies.map(movie => (
										<Text key={movie.id} style={styles.userMovies}>
											{movie.movie}
										</Text>
								  ))
								: '-'}
						</View>
					</View>
					<View style={styles.userFavorites}>
						<Text style={styles.userSubtitle}>Favorite TV-shows: </Text>
						<View style={styles.userMoviesWrap}>
							{favShows.length > 0
								? favShows.map(movie => (
										<Text key={movie.id} style={styles.userMovies}>
											{movie.movie}
										</Text>
								  ))
								: '-'}
						</View>
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
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileView);

const styles = StyleSheet.create({
	profileWrap: {
		height: 300,
		flex: 1,
		paddingTop: 10,
		paddingLeft: 10,
		paddingRight: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	userInfo: {
		flex: 3,
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	profileImg: {
		width: 50,
		height: 50
	},
	userPersonal: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
		width: '100%'
	},
	userFavorites: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 10
	},
	userName: {
		fontSize: 20,
		marginTop: 10,
		textAlign: 'center'
	},

	userSubtitle: {
		fontWeight: 'bold',
		width: 130,
		marginRight: 15
	},
	userMovies: {
		backgroundColor: 'rgba(251,135,0,.7)',
		padding: 3,
		borderRadius: 10,
		color: '#fff',
		lineHeight: 15,
		marginBottom: 5,
		marginLeft: 5
	},
	userMoviesWrap: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-end'
	},
	userIconWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 70,
		justifyContent: 'flex-end'
	},
	userIcon: {
		marginRight: 5,
		fontWeight: '900',
		width: 15
	},
	horizontalContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	followBlock: {
		marginLeft: 30,
	},
	followItem: {
		marginRight: 20,
	},
	followText: {
		fontFamily: 'Inter-Regular',
		color: '#122737',
		letterSpacing: 0.4,
		fontSize: 12,
		textAlign: 'center'
	},
	followAmount: {
		fontSize: 16,
		fontFamily: 'Inter-SemiBold'
	},
	followBttn: {
		width: '100%',
		marginTop: 5,
		justifyContent: 'center'
	},
	bttnText: {
		fontSize: 15,
		fontFamily: 'Inter-SemiBold',
		letterSpacing: 0.4,
		textAlign: 'center',
		width: '100%',
		padding: '2%',
		borderRadius: 5,
		height: 26
	},
	followBttnText: {
		backgroundColor: '#FF6501',
		color: 'white'
	},
	unfollowBttnText: {
		color: '#FF6501',
		borderWidth: 2,
		borderColor: '#FF6501'
	}
});
