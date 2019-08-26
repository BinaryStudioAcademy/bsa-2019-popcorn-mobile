import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import config from '../../config';
import ISelectedProfileInfo from './SelectedProfileInterfase';

type IProfileProps = {
	profileInfo: ISelectedProfileInfo;
	uploadAvatar?: (FormData, string) => any;
	uploadUrl?: string;
	cancelAvatar?: () => any;
	setAvatar?: (url: string, id: string) => any;
	selectedProfileInfo: any;
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
	avatar:
		'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png',
	id: 1
};

class UserProfileView extends Component<IProfileProps> {
	constructor(props: IProfileProps) {
		super(props);
	}

	render() {
		let { location, aboutMe, avatar } = mockProfileInfo;
		let { male, female, name } = this.props.selectedProfileInfo;
		if (!male && !female) {
			female = true;
		}

		if (!location) {
			location = 'Kyiv';
		}

		return (
			<View style={styles.profileWrap}>
				<View>
					<Image
						source={{
							uri: avatar
						}}
						style={styles.profileImg}
					/>
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
	selectedProfileInfo: rootState.authorization.profileInfo
});

export default connect(mapStateToProps)(UserProfileView);

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
	}
});
