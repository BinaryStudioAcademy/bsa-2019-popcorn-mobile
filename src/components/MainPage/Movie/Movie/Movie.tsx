import React, { Component } from 'react';
import { fetchMovie, fetchMovieStatus } from '../../../../redux/routines';
import { addToWatchlist } from './../../../UserPage/WatchList/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import config from '../../../../config';
import {
	Text,
	View,
	ImageBackground,
	StyleSheet,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import IMovie from '../IMovie';
import SvgUri from 'react-native-svg-uri';
import Spinner from './../../../Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import * as YellowStarIcon from './../../../../assets/general/starYellow.svg';
import * as GreyStarIcom from './../../../../assets/general/starGrey.svg';
import * as ChevronDownIcon from './../../../../assets/general/chevron-down.svg';
const { width } = Dimensions.get('window');

interface IMovieProps {
	movie?: null | IMovie;
	error: null | Error;
	loading: boolean;
	fetchMovie: (payload: any) => any;
	navigation: any;
	addToWatchlist: (movieId: string, userId: string) => any;
	userId: string;
	status: null | string;
	fetchMovieStatus: (movieId: string) => any;
}

interface IState {
	firstSection: boolean;
	secondSection: boolean;
	thirdSection: boolean;
}

class Movie extends Component<IMovieProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			firstSection: true,
			secondSection: false,
			thirdSection: false
		};
	}

	componentDidMount() {
		const id = this.props.navigation.getParam('id');
		this.props.fetchMovie({ id });
		this.props.fetchMovieStatus(id);
	}

	rateYellowStarComponent(key: number, size) {
		return (
			<View style={styles.starWrapper}>
				<SvgUri
					height={size}
					width={size}
					key={key}
					svgXmlData={YellowStarIcon}
				/>
			</View>
		);
	}

	rateGreyStarComponent(key: number, size) {
		return (
			<View style={styles.starWrapper}>
				<SvgUri
					height={size}
					width={size}
					key={key}
					svgXmlData={GreyStarIcom}
				/>
			</View>
		);
	}
	rateBlock(rateString: string, size: number) {
		const rate = parseFloat(rateString);
		const res: any = [];

		for (let i = 0; i < 5; i++) {
			i < rate
				? res.push(this.rateYellowStarComponent(i, size))
				: res.push(this.rateGreyStarComponent(i, size));
		}
		return res;
	}

	showSecondSection() {
		this.setState({ secondSection: true, firstSection: false });
	}

	showThirdSection() {
		this.setState({ thirdSection: true });
	}

	render() {
		const { movie, status } = this.props;
		let parsedGenres;
		let parsedCast;
		let director;
		let writer;
		if (movie) {
			parsedGenres = JSON.parse(movie.genres).map(genre => genre.name);
			parsedCast = JSON.parse(movie.cast).map(actor => actor.name);
			director = movie.crew.find(item => item.department === 'Directing').name;
			writer = movie.crew.find(item => item.department === 'Writing').name;
		}
		const { firstSection, secondSection, thirdSection } = this.state;
		return movie ? (
			<View style={styles.movieWrapper}>
				<View style={styles.movieImageWrapper}>
					<ImageBackground
						source={{
							uri:
								config.POSTER_PATH + movie.poster_path ||
								config.DEFAULT_MOVIE_IMAGE
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
												...styles.updateControl
											}}
											icon={faCheckCircle}
											size={40}
										/>
									) : (
										<FontAwesomeIcon
											style={styles.updateControl}
											icon={faPlusCircle}
											size={40}
										/>
									)}
								</View>
							)}
						</View>
					</ImageBackground>
				</View>
				{firstSection && (
					<View style={styles.basicInfoWrapper}>
						<Text style={styles.movieTitle}>{movie.title}</Text>
						<View style={styles.subTitleWrapper}>
							<View style={styles.rightDevide}>
								<Text style={styles.basicInfoSubTitle}>
									{movie.release_date ? movie.release_date.slice(0, 4) : null}
								</Text>
							</View>
							<View style={styles.leftDevide}>
								<Text style={styles.basicInfoSubTitle}>{director}</Text>
							</View>
						</View>
						<View style={styles.rateBlock}>
							{this.rateBlock(
								movie.vote_average ? +movie.vote_average / 2 + '' : '4',
								20
							)}
						</View>
						<TouchableOpacity onPress={() => this.showSecondSection()}>
							<View style={styles.moreControlWrapper}>
								<Text style={styles.moreTitle}>More info</Text>
								<SvgUri height={17} width={23} svgXmlData={ChevronDownIcon} />
							</View>
						</TouchableOpacity>
					</View>
				)}
				{secondSection && (
					<View
						style={
							!thirdSection
								? styles.secondSectionInfowWrapper
								: styles.thirdSectionInfoWrapper
						}
					>
						<View style={styles.secondSectionInfowWrapperHeader}>
							<Text style={styles.secondSectionTitle}>{movie.title}</Text>
							<Text style={styles.secondSectionTitle}>
								{movie.vote_average ? +movie.vote_average * 10 + '%' : '85%'}
							</Text>
						</View>
						<View>
							<View style={styles.secondSectionInfowWrapperHeader}>
								<Text style={styles.secondSectionSubTitle}>
									{movie.release_date ? movie.release_date.slice(0, 4) : null},
									{parsedGenres.join(', ')}
								</Text>
								<View style={styles.rateBlock}>
									{this.rateBlock(
										movie.vote_average ? +movie.vote_average / 2 + '' : '4',
										10
									)}
								</View>
							</View>

							<Text style={styles.movieOverview}>{movie.overview}</Text>
							<Text style={styles.secondSectionInfo}>
								<Text style={styles.bold}>Director: </Text>
								{director}
							</Text>
							{!thirdSection ? (
								<TouchableOpacity onPress={() => this.showThirdSection()}>
									<View style={styles.moreControlWrapper}>
										<SvgUri
											height={17}
											width={23}
											svgXmlData={ChevronDownIcon}
										/>
									</View>
								</TouchableOpacity>
							) : (
								<View>
									<Text style={styles.secondSectionInfo}>
										<Text style={styles.bold}>Writer: </Text>
										{writer}
									</Text>
									<Text style={styles.secondSectionInfo} numberOfLines={1}>
										<Text style={styles.bold}>Stars: </Text>
										{parsedCast.join(', ')}
									</Text>
									{!status && (
										<TouchableOpacity
											onPress={() =>
												this.props.addToWatchlist(movie.id, this.props.userId)
											}
										>
											<Text style={[styles.text, styles.button]}>
												Add to Watchlist
											</Text>
										</TouchableOpacity>
									)}
									<TouchableOpacity
										onPress={() =>
											this.props.navigation.navigate('ReviewPage', {
												id: movie.id
											})
										}
									>
										<Text style={[styles.text, styles.button]}>
											Read Reviews
										</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>
					</View>
				)}
			</View>
		) : (
			<Spinner />
		);
	}
}

const styles = StyleSheet.create({
	movieWrapper: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.15)'
	},
	movieImageWrapper: {
		flex: 1
	},
	movieImage: {
		height: '100%'
	},
	basicInfoWrapper: {
		marginTop: 'auto',
		paddingTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.11)',
		borderRadius: 19,
		borderBottomRightRadius: 0,
		borderBottomLeftRadius: 0,
		backgroundColor: '#FFFFFF'
	},
	movieTitle: {
		fontFamily: 'Inter-Bold',
		fontSize: 27,
		flexWrap: 'wrap',
		flexDirection: 'row',
		letterSpacing: 0.4,
		color: 'rgb(18, 39, 55)',
		marginBottom: 5,
		textTransform: 'uppercase'
	},
	basicInfoSubTitle: {
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		lineHeight: 17,
		letterSpacing: 0.4,
		color: 'rgba(0, 0, 0, 0.5)',
		textTransform: 'uppercase'
	},
	subTitleWrapper: {
		flexDirection: 'row'
	},
	leftDevide: {
		borderLeftColor: 'rgba(0, 0, 0, 0.5)',
		borderLeftWidth: 1,
		paddingLeft: 6
	},
	rightDevide: {
		marginRight: 6
	},
	rateBlock: {
		flexDirection: 'row',
		marginTop: 5,
		alignContent: 'center'
	},
	starWrapper: {
		marginHorizontal: 5
	},
	moreControlWrapper: {
		marginTop: 24,
		alignItems: 'center'
	},
	moreTitle: {
		fontFamily: 'Inter-Regular',
		fontSize: 10,
		lineHeight: 12,
		letterSpacing: 0.4,
		color: 'rgba(0, 0, 0, 0.5)'
	},
	secondSectionInfowWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
		marginTop: 'auto',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.11)',
		borderRadius: 19,
		backgroundColor: '#FFFFFF',
		padding: 25
	},
	secondSectionInfowWrapperHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: 8
	},
	secondSectionTitle: {
		fontFamily: 'Inter-Bold',
		fontSize: 12,
		lineHeight: 15,
		letterSpacing: 0.4,
		color: 'rgb(18, 39, 55)',
		marginBottom: 5
	},
	secondSectionSubTitle: {
		fontFamily: 'Inter-Regular',
		fontSize: 10,
		lineHeight: 11,
		letterSpacing: 0.4,
		color: 'rgba(0, 0, 0, 0.5)'
	},
	movieOverview: {
		fontFamily: 'Inter-Bold',
		fontSize: 12,
		lineHeight: 15,
		letterSpacing: 0.4,
		color: 'rgb(18, 39, 55)',
		marginBottom: 20,
		marginTop: 30
	},
	bold: {
		fontFamily: 'Inter-Bold',
		fontSize: 12,
		lineHeight: 15,
		letterSpacing: 0.4,
		color: 'rgb(18, 39, 55)',
		marginBottom: 5
	},
	secondSectionInfo: {
		fontFamily: 'Inter-Regular',
		fontSize: 12,
		lineHeight: 15,
		letterSpacing: 0.4,
		color: 'rgba(0, 0, 0, 0.5)',
		marginBottom: 5,
		backgroundColor: '#FFFFFF'
	},
	thirdSectionInfoWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
		marginTop: 'auto',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.11)',
		borderRadius: 19,
		backgroundColor: '#FFFFFF',
		padding: 25
	},
	button: {
		textAlignVertical: 'center',
		alignSelf: 'center',
		width: 155,
		backgroundColor: '#FF6501',
		marginTop: 22,
		borderRadius: 19,
		padding: 10,
		textAlign: 'center',
		fontSize: 14,
		color: 'white',
		fontFamily: 'Inter-SemiBold'
	},
	text: {
		letterSpacing: 0.4,
		fontFamily: 'Inter-Regular'
	},
	controlsWrapper: {
		width: '100%',
		flexDirection: 'row'
	},
	updateControlWrapper: {
		marginLeft: 10,
		marginTop: 5
	},
	updateControl: {
		padding: 10,
		paddingTop: 15,
		color: '#555',
		fontSize: 60
	}
});

const mapStateToProps = (rootState, props) => ({
	...props,
	movie: rootState.movie.movie,
	status: rootState.movie.status,
	error: rootState.movie.error,
	loading: rootState.movie.loading,
	userId: rootState.authorization.profileInfo.id
});

const actions = {
	fetchMovie,
	addToWatchlist,
	fetchMovieStatus
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Movie);
