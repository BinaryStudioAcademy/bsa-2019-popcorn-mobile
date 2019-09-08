import React from 'react';
import { fetchGenres, fetchFiltred } from '../../redux/routines';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	View,
	TouchableOpacity,
	Text,
	ScrollView,
	StyleSheet
} from 'react-native';
import SearchInput from './SearchInput';
import SvgUri from 'react-native-svg-uri';
import SearchCheckbox from './SearchCheckbox';
import Spinner from '../Spinner/Spinner';
import { tsThisType } from '@babel/types';
import SearchDate from './SearchDate';
import { setFilters } from '../MainPage/Movie/actions';

interface IAdvancedMovieSearchProps {
	fetchFiltred: (filters: any) => any;
	setFilters: (filters: any) => any;
	genres: any;
	casts: any;
}

type AdvancedMovieSearchState = {
	nameValue: string;
	genresValues: Array<string>;
	ratingValues: Array<number>;
	yearValues: { startDate: string; endDate: string };
	crewValues: Array<string>;
	castValues: string;
	durationValues: Array<number>;
	descriptionValue: string;
};

class AdvancedSearch extends React.Component<
	IAdvancedMovieSearchProps,
	AdvancedMovieSearchState
> {
	constructor(props) {
		super(props);
		this.state = {
			nameValue: '',
			genresValues: [],
			ratingValues: [],
			yearValues: {
				startDate: '1900-01-01',
				endDate: this.convert(new Date())
			},
			descriptionValue: '',
			castValues: '',
			crewValues: [],
			durationValues: []
		};
		this.handleGenreChange = this.handleGenreChange.bind(this);
		this.handleRatingChange = this.handleRatingChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleCrewChange = this.handleCrewChange.bind(this);
		this.handleCastChange = this.handleCastChange.bind(this);
		this.handleDurationChange = this.handleDurationChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
	}

	componentDidMount() {
		this.props.fetchGenres();
		this.setState({
			...this.props.filters
		});
	}

	handleGenreChange = genre => {
		let newGenres = this.state.genresValues;
		if (newGenres.includes(genre) === false) {
			newGenres.push(genre);
		} else {
			newGenres = newGenres.filter(el => el !== genre);
		}
		this.setState(
			{
				...this.state,
				genresValues: newGenres
			},
			() => {
				this.props.setFilters(this.state);
				this.props.fetchFiltred(this.state);
			}
		);
	};

	handleRatingChange = val => {
		this.setState(
			{
				...this.state,
				ratingValues: [val[0], val[1]]
			},
			() => {
				this.props.setFilters(this.state);
				this.props.fetchFiltred(this.state);
			}
		);
	};

	convert(newDate) {
		let year = newDate.getFullYear();
		let mnth = ('0' + (newDate.getMonth() + 1)).slice(-2);
		let day = ('0' + newDate.getDate()).slice(-2);
		return [year, mnth, day].join('-');
	}

	handleYearChange = val => {
		let convertedVal = {
			startDate: val.startDate
				? this.convert(val.startDate)
				: this.state.yearValues.startDate,
			endDate: val.endDate
				? this.convert(val.endDate)
				: this.state.yearValues.endDate
		};
		this.setState(
			{
				...this.state,
				yearValues: convertedVal
			},
			() => {
				this.props.setFilters(this.state);
				this.props.fetchFiltred(this.state);
			}
		);
	};

	handleDescriptionChange = val => {
		this.setState(
			{
				...this.state,
				descriptionValue: val
			},
			() => {
				this.props.setFilters(this.state);
				this.props.fetchFiltred(this.state);
			}
		);
	};

	handleNameChange = val => {
		this.setState(
			{
				...this.state,
				nameValue: val
			},
			() => {
				this.props.setFilters(this.state);
				this.props.fetchFiltred(this.state);
			}
		);
	};

	handleCrewChange = crew => {
		let newCrew = this.state.crewValues;
		if (newCrew.includes(crew) === false) {
			newCrew.push(crew);
		} else {
			newCrew = newCrew.filter(el => el !== crew);
		}

		this.setState({
			...this.state,
			crewValues: newCrew
		});
	};

	handleCastChange = val => {
		this.setState(
			{
				...this.state,
				castValues: val
			},
			() => {
				this.props.setFilters(this.state);
				this.props.fetchFiltred(this.state);
			}
		);
	};

	handleDurationChange = val => {
		this.setState(
			{
				...this.state,
				durationValues: val
			},
			() => {
				this.props.setFilters(this.state);
				this.props.fetchFiltred(this.state);
			}
		);
	};

	clearFilter() {
		const clear = {
			nameValue: '',
			genresValues: [],
			ratingValues: [],
			yearValues: {
				startDate: '1900-01-01',
				endDate: this.convert(new Date())
			},
			descriptionValue: '',
			castValues: '',
			crewValues: [],
			durationValues: []
		};

		this.props.setFilters(clear);
		this.props.fetchFiltred(clear);
		this.props.navigation.goBack();
	}

	render() {
		if (!this.props.genres && !this.props.filters) return <Spinner />;
		const { genres = [], filters } = this.props;

		return (
			<View style={styles.container}>
				<View
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.goBack();
						}}
					>
						<SvgUri
							height={20}
							width={20}
							source={require('../../assets/general/back.svg')}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.clearFilter();
						}}
					>
						<Text style={{ color: 'gray' }}>Clear filter</Text>
					</TouchableOpacity>
				</View>
				<SearchInput
					action={this.handleNameChange}
					showFilter={false}
					value={filters.nameValue}
					quickShowBlock={false}
				/>
				<ScrollView>
					<Text style={styles.heading}>Genres</Text>
					<ScrollView style={styles.optionContainer}>
						{genres.map(item => {
							return (
								<SearchCheckbox
									key={item.id}
									label={item.name}
									action={this.handleGenreChange}
									checked={
										filters.genresValues.includes(item.name) ? true : false
									}
								/>
							);
						})}
					</ScrollView>
					<Text style={styles.heading}>Cast</Text>
					<SearchInput
						action={this.handleCastChange}
						showFilter={false}
						value={filters.castValues}
						quickShowBlock={false}
					/>
					<Text style={styles.heading}>Description</Text>
					<SearchInput
						action={this.handleDescriptionChange}
						showFilter={false}
						value={filters.descriptionValue}
						quickShowBlock={false}
					/>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	genres: rootState.movies.genres,
	filters: rootState.movies.filters
});

const actions = {
	setFilters,
	fetchGenres,
	fetchFiltred
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdvancedSearch);

const styles = StyleSheet.create({
	container: {
		padding: 15
	},
	optionContainer: {
		maxHeight: 300,
		marginTop: 15,
		marginBottom: 15
	},
	heading: {
		marginTop: 15,
		marginBottom: 15,
		fontSize: 20,
		fontWeight: '600'
	}
});
