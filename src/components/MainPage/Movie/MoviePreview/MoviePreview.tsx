import React, { Component } from 'react';
import config from '../../../../config';
import {
	Text,
	View,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import IMovie from '../IMovie';
import SvgUri from 'react-native-svg-uri';
import getFilmDuration from './../../../../helpers/movie.helper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface IMovieProps {
	movie: IMovie;
	navigation: any;
	userId: string;
	addToWatchlist: (movieId: string, userId: string) => any;
}

class MoviePreview extends Component<IMovieProps> {
	render() {
		const {
			id,
			poster_path,
			title,
			genres,
			runtime,
			cast,
			release_date,
			status
		} = this.props.movie;
		const { userId, addToWatchlist } = this.props;
		const duration = getFilmDuration(runtime);
		const parsedGenres = JSON.parse(genres).map(genre => genre.name);
		const parsedCast = JSON.parse(cast).map(actor => actor.name);
		return (
			<TouchableOpacity
				onPress={() => {
					const state = this.props.navigation.state;
					if (!state.params || !state.params.onSave)
						this.props.navigation.navigate('Movie', {
							id: this.props.movie.id
						});
					else if (state.params.onSave) {
						state.params.onSave(this.props.movie);
						this.props.navigation.navigate('Constructor', {
							movieId: this.props.movie.id
						});
					}
				}}
			>
				<View style={styles.movieWrapper}>
					<ImageBackground
						source={{
							uri:
								config.POSTER_PATH + poster_path || config.DEFAULT_MOVIE_IMAGE
						}}
						style={styles.movieImage}
						resizeMode="contain"
					>
						<View style={styles.controlsWrapper}>
							{status && (
								<View style={styles.updateControlWrapper}>
									{status === 'watched' ? (
										<FontAwesomeIcon
											style={{
												...styles.updateControl,
												color: 'rgb(73, 199, 54)'
											}}
											icon={faCheckCircle}
											size={20}
										/>
									) : (
										<FontAwesomeIcon
											style={styles.updateControl}
											icon={faPlusCircle}
											size={20}
										/>
									)}
								</View>
							)}
						</View>
					</ImageBackground>
					<View style={styles.movieInfoBlock}>
						<View style={styles.header}>
							<Text style={styles.movieTitle}>{title}</Text>
							<Text style={styles.movieYear}>
								{release_date ? '(' + release_date.slice(0, 4) + ')' : null}
							</Text>
						</View>
						<Text style={[styles.movieInfo, styles.movieInfoBlock]}>
							{parsedGenres.join(', ')}
						</Text>
						{duration && (
							<View style={styles.duration}>
								<View style={styles.durationIcon}>
									<SvgUri
										height={15}
										source={require('./../../../../assets/general/duration-icon.svg')}
									/>
								</View>
								<Text style={styles.movieInfo}>{duration}</Text>
							</View>
						)}
						<Text
							style={[styles.movieInfo, styles.movieInfoBlock]}
							numberOfLines={1}
						>
							<Text style={styles.bold}>Movie cast: </Text>
							{parsedCast.join(', ')}
						</Text>
						{!status && (
							<TouchableOpacity onPress={() => addToWatchlist(id, userId)}>
								<Text style={[styles.text, styles.button]}>
									Add to Watchlist
								</Text>
							</TouchableOpacity>
						)}
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	movieWrapper: {
		flex: 1,
		flexDirection: 'row',
		marginVertical: 10,
		backgroundColor: '#FFFFFF'
	},
	movieImage: {
		height: 200,
		width: 160
	},
	header: {
		marginVertical: 10,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	durationIcon: {
		height: 20,
		width: 20,
		marginRight: 9
	},
	movieInfoBlock: {
		marginVertical: 5,
		width: '70%'
	},
	movieYear: {
		flex: 1,
		fontFamily: 'Inter-Bold',
		fontSize: 13,
		lineHeight: 15,
		letterSpacing: 0.4,
		color: 'rgb(18, 39, 55)',
		marginRight: 10
	},
	movieTitle: {
		flex: 2,
		fontFamily: 'Inter-Bold',
		fontSize: 13,
		lineHeight: 15,
		letterSpacing: 0.4,
		color: 'rgb(18, 39, 55)',
		marginRight: 10
	},
	duration: {
		flexDirection: 'row',
		marginVertical: 5
	},
	movieInfo: {
		fontFamily: 'Inter-Regular',
		fontSize: 12,
		lineHeight: 14,
		letterSpacing: 0.4,
		color: 'rgba(18, 39, 55, 0.8)'
	},
	bold: {
		fontFamily: 'Inter-Bold'
	},
	controlsWrapper: {
		width: '100%',
		flexDirection: 'row'
	},
	updateControlWrapper: {
		marginLeft: 15,
		marginTop: 5
	},
	updateControl: {
		padding: 8,
		borderRadius: 16,
		color: 'white',
		backgroundColor: 'rgba(0, 0, 0, 0.726)'
	},
	button: {
		textAlignVertical: 'center',
		width: 175,
		height: 27,
		backgroundColor: '#FF6501',
		marginTop: 22,
		borderRadius: 55,
		textAlign: 'center',
		lineHeight: 14,
		fontSize: 12,
		color: 'white',
		fontFamily: 'Inter-SemiBold'
	},
	text: {
		letterSpacing: 0.4,
		fontFamily: 'Inter-Regular'
	}
});
export default MoviePreview;
