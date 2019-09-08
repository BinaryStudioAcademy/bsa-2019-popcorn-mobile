import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	CheckBox,
	Image,
	ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveCollection } from '../../redux/routines';
import { INewMovieList } from './ICollection';
import ImageUploader from '../ImageUploader/index';
import Spinner from '../Spinner/Spinner';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';
import config from '../../config';
import collections from './saga';

const camera = require('../../assets/general/camera.svg');

interface IProps {
	navigation: any;
	saveCollection: ({ movieList: INewMovieList }) => void;
}

interface IState {
	collection: INewMovieList;
	loading: boolean;
	movieDetails: any;
}

class Collection extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			collection: {
				title: '',
				description: '',
				isPrivate: false,
				moviesId: [],
				imageUrl: ''
			},
			movieDetails: [],
			loading: false
		};
	}

	onChangeTitle = value => {
		this.setState({
			collection: {
				...this.state.collection,
				title: value
			}
		});
	};

	onChangeDescription = value => {
		this.setState({
			collection: {
				...this.state.collection,
				description: value
			}
		});
	};

	onChangePrivacy = () => {
		this.setState({
			collection: {
				...this.state.collection,
				isPrivate: !this.state.collection.isPrivate
			}
		});
	};

	onNewMovie = movie => {
		const movies = this.state.collection.moviesId;
		const { movieDetails } = this.state;
		movies.push(movie.id);
		movieDetails.push(movie);
		this.setState({
			collection: {
				...this.state.collection,
				moviesId: movies
			},
			movieDetails
		});
	};

	validate = () => {
		if (
			!this.state.collection.title.trim() ||
			!this.state.collection.moviesId.length
		)
			return false;
		return true;
	};

	onSave = () => {
		if (!this.validate()) return;
		this.props.saveCollection({ movieList: this.state.collection });
		this.props.navigation.navigate('Profile');
	};

	render() {
		const { navigation } = this.props;
		const { title, description, imageUrl, isPrivate } = this.state.collection;
		if (this.state.loading === true) return <Spinner />;
		return (
			<ScrollView>
				<TextInput
					style={styles.input}
					textAlignVertical={'top'}
					value={title}
					multiline={true}
					numberOfLines={1}
					onChangeText={this.onChangeTitle}
					placeholder="Title"
				/>
				<TextInput
					value={description}
					textAlignVertical={'top'}
					multiline={true}
					numberOfLines={2}
					onChangeText={this.onChangeDescription}
					style={styles.input}
					placeholder="Description"
				/>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						marginLeft: 20,
						alignItems: 'center',
						width: 100
					}}
					onPress={this.onChangePrivacy}
				>
					<CheckBox value={isPrivate} onChange={this.onChangePrivacy} />
					<Text
						style={{
							...styles.collectionText,
							fontSize: 16,
							fontFamily: 'InterMedium'
						}}
					>
						private
					</Text>
				</TouchableOpacity>
				<View>
					<ImageUploader
						startUpload={() => this.setState({ loading: true })}
						saveUrl={(image_url: string) => {
							this.setState({
								collection: {
									...this.state.collection,
									imageUrl: image_url
								},
								loading: false
							});
						}}
					>
						<SvgUri
							style={styles.imageUploader}
							width={50}
							height={50}
							source={camera}
						/>
					</ImageUploader>
					{!!imageUrl && (
						<View style={styles.UploadWrp}>
							<Image
								style={styles.collectionImage}
								source={{ uri: imageUrl }}
							/>
						</View>
					)}
				</View>
				<View style={{ marginLeft: 20 }}>
					{this.state.movieDetails.map(movie => (
						<View style={styles.topItem} key={movie.id}>
							<Image
								source={{
									uri:
										config.POSTER_PATH + movie.poster_path ||
										config.DEFAULT_MOVIE_IMAGE
								}}
								style={styles.poster}
								resizeMode="contain"
							/>
							<View style={{ marginLeft: 15, flex: 1 }}>
								<View style={styles.titleContainer}>
									<Text style={[styles.collectionText, styles.movieTitle]}>
										{movie.title}
									</Text>
								</View>
								<Text
									numberOfLines={7}
									style={[styles.collectionText, styles.comment]}
								>
									{movie.overview}
								</Text>
							</View>
						</View>
					))}
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-around',
						marginTop: 20
					}}
				>
					<TouchableOpacity
						style={{ ...styles.addCollectionBttn, marginRight: 10 }}
						onPress={() => {
							navigation.navigate('ChooseMovie', { onSave: this.onNewMovie });
						}}
					>
						<Text style={styles.bttnText}>Add movie</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.addCollectionBttn}
						onPress={this.onSave}
					>
						<Text style={styles.bttnText}>Save</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	loading: rootState.collections.loading,
	collection: rootState.collections.movieListDetails
});

const actions = {
	saveCollection
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Collection);
