import React, { Component } from 'react';
import config from '../../../../config';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import IMovie from '../IMovie';
import SvgUri from 'react-native-svg-uri';
import getFilmDuration from './../../../../helpers/movie.helper';

interface IMovieProps {
    movie: IMovie
}

class MoviePreview extends Component<IMovieProps> {
    render() {
        const { poster_path, title, genres, runtime, cast, release_date } = this.props.movie;
        const duration = getFilmDuration(runtime);
        return (
            <TouchableOpacity>
                <View style={styles.movieWrapper}>
                    <Image
                        source={{ uri: poster_path || config.DEFAULT_MOVIE_IMAGE }}
                        style={styles.movieImage}
                    />
                    <View style={styles.movieInfoBlock}>
                        <Text style={styles.movieTitle}>
                            {title}
                            {release_date
                                ? '(' + release_date.slice(0, 4) + ')'
                                : null}
                        </Text>
                        <View>
                            <Text style={styles.movieInfo}>{genres}</Text>
                            {
                                duration && (
                                    <View>
                                        <SvgUri
                                            height={30}
                                            source={require('./../../../../assets/general/duration-icon.svg')}
                                        />
                                        {duration}
                                    </View>
                                )
                            }
                        </View>
                        <Text>
                           <Text>Movie cast: </Text>
                           {cast}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    movieWrapper: {

    },
    movieImage: {

    },
    movieInfoBlock: {

    },
    movieTitle: {

    },
    movieInfo: {

    }
})
export default MoviePreview;
