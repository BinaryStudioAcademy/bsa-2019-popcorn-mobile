import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    ImageBackground,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    fetchCollectionDetails
} from '../../redux/routines';
import Spinner from '../Spinner/Spinner';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { IMovieListDetails } from './ICollection';
import styles from './styles';
import config from '../../config';
import Moment from 'moment';

interface IProps {
    navigation: any;
    loading: boolean;
    collection: IMovieListDetails;
    fetchCollectionDetails: ({ movieListId: string }) => void
}

class Collection extends Component<IProps> {
    componentDidMount() {
        this.props.fetchCollectionDetails({ movieListId: this.props.navigation.state.params.id });
    }
    render () {
        const { navigation, loading, collection } = this.props;
        if (loading || !this.props.collection) return <Spinner />
        const { movieList, movies } = collection;
        const { title, description, imageUrl, user, createdAt } = movieList;
        const image = imageUrl ? 'https://' + imageUrl : 'https://www.goldderby.com/wp-content/uploads/2017/12/Oscar-statuette-trophy-atmo.png';
        return (
            <ParallaxScrollView 
			parallaxHeaderHeight={180}
			backgroundColor="#FFFFFF"
			contentBackgroundColor="#FFFFFF"
			renderForeground={() => <ImageBackground 
					source={{ uri: image }}
					style={styles.imageBackground}
				>
					<View style={styles.background}>
						<View style={styles.horizontalContainer}>
							<Image
								source={{
									uri:
										user.avatar ||
										'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png'
								}}
								style={styles.avatar}
							/>
							<Text style={[styles.collectionText, styles.imageText]}>{user.name}</Text>
							<Text style={[styles.collectionText, styles.imageText, styles.collectionDate]}>
								{Moment(createdAt).format('ll')}
							</Text>	
						</View>
					 	<Text style={[styles.imageText, styles.collectionTitle]}>{title}</Text>
					</View>
				</ImageBackground>
			}>	
			    <Text style={[styles.collectionText, styles.description]}>{description}</Text>
			    {
			    	movies.map((movie, i) => <TouchableWithoutFeedback>
			    		<TouchableOpacity 
			    			style={styles.topItem} 
			    			key={i}
			    			onPress={() => { navigation.navigate('Movie', { id:  movie.id})  }}
			    		>
			    			<Image
			    				source={{
			    					uri:
			    						config.POSTER_PATH + movie.poster_path || config.DEFAULT_MOVIE_IMAGE
			    				}}
			    				style={styles.poster}
			    				resizeMode="contain"
			    			/> 
			    			<View style={{ marginLeft: 15, flex: 1 }}>
			    				<View style={styles.titleContainer}>
			    					<Text style={[styles.collectionText, styles.movieTitle]}>{movie.title}</Text> 
			    				</View>
			    				<Text numberOfLines={7} style={[styles.collectionText, styles.comment]}>{movie.overview}</Text>
			    			</View>
			    		</TouchableOpacity>
			    	</TouchableWithoutFeedback>)
			    }
		    </ParallaxScrollView>
        )
    }
}

const mapStateToProps = (rootState, props) => ({
    ...props,
    loading: rootState.collections.loading,
	collection: rootState.collections.movieListDetails,
});

const actions = {
    fetchCollectionDetails
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Collection);