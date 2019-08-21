import React, { Component } from 'react';
import config from '../../../../config';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import IMovie from '../IMovie';
import SvgUri from 'react-native-svg-uri';
import getFilmDuration from './../../../../helpers/movie.helper';
const { width } = Dimensions.get('window');

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
                        source={{ uri: config.POSTER_PATH + poster_path || config.DEFAULT_MOVIE_IMAGE }}
                        style={styles.movieImage}
                        resizeMode="contain"
                    />
                    <View style={styles.movieInfoBlock}>
                        <View style={styles.header}>
                            <Text style={styles.movieTitle}>
                                {title}
                            </Text>
                            <Text style={styles.movieTitle}>
                                {release_date
                                    ? '(' + release_date.slice(0, 4) + ')'
                                    : null}
                            </Text>
                        </View>
                        <Text style={[styles.movieInfo, styles.movieInfoBlock]}>{'Action, Drama, Horror'}</Text>
                        {
                            duration && (
                                <View style={styles.duration}>
                                    <View style={styles.durationIcon}>
                                        <SvgUri
                                            height={15}
                                            source={require('./../../../../assets/general/duration-icon.svg')}
                                        />
                                    </View>
                                    <Text style={styles.movieInfo}>{duration}</Text>
                                </View>
                            )
                        }
                        <Text style={[styles.movieInfo, styles.movieInfoBlock]} numberOfLines = { 1 } ellipsizeMode = 'head'>
                            <Text style={styles.bold}>Movie cast: </Text>
                            {cast || 'Matt Damon, Jessic...'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    movieWrapper: {
        width: width,
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    movieImage: {
        height: 200,
        width: 160,
    },
    header: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    durationIcon: {
        height: 20,
        width: 20,
        marginRight: 9,
    },
    movieInfoBlock: {
        marginVertical: 5
    },
    movieTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 13,
        lineHeight: 15,
        letterSpacing: 0.4,
        color: 'rgb(18, 39, 55)',
        marginRight: 10,
    },
    duration: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    movieInfo: {
        fontFamily: 'Inter-Refular',
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: 0.4,
        color: 'rgba(18, 39, 55, 0.8)',
    },
    bold: {
        fontFamily: 'Inter-Bold',
    }
})
export default MoviePreview;
