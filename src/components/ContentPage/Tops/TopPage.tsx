import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import Moment from 'moment';
import config from '../../../config';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface IProps {
	navigation: any;
}

const TopPage: React.FC<IProps> = ({ navigation }) => {
	console.log(navigation.state.params.top);
	const { 
		title, 
		description, 
		movieInTop, 
		topImageUrl, 
		user,
		created_at
	} = navigation.state.params.top;
	return (
		<ParallaxScrollView 
			parallaxHeaderHeight={180}
			backgroundColor="#FFFFFF"
			contentBackgroundColor="#FFFFFF"
			renderForeground={() => <ImageBackground 
					source={{ uri: topImageUrl || 'https://www.goldderby.com/wp-content/uploads/2017/12/Oscar-statuette-trophy-atmo.png' }}
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
							<Text style={[styles.text, styles.imageText]}>{user.name}</Text>
							<Text style={[styles.text, styles.imageText, styles.date]}>
								{Moment(created_at).format('ll')}
							</Text>	
						</View>
					 	<Text style={[styles.imageText, styles.title]}>{title}</Text>
					</View>
				</ImageBackground>
			}
		>	
			<Text style={[styles.text, styles.description]}>{description}</Text>
			{
				movieInTop.map((movie, i) => <TouchableWithoutFeedback>
					<TouchableOpacity 
						style={styles.topItem} 
						key={i}
						onPress={() => { navigation.navigate('Movie', { id:  movie.movieId})  }}
					>
						<Image
							source={{
								uri:
									config.POSTER_PATH + movie.movie.poster_path || config.DEFAULT_MOVIE_IMAGE
							}}
							style={styles.poster}
							resizeMode="contain"
						/>
						<View style={{ marginLeft: 15, flex: 1 }}>
							<View style={styles.titleContainer}>
								<Text style={[styles.text, styles.number]}>{i + 1}</Text> 
								<Text style={[styles.text, styles.movieTitle]}>{movie.movie.title}</Text>
							</View>
							<Text style={[styles.text, styles.comment]}>{movie.comment}</Text>
							<TouchableWithoutFeedback>
								<TouchableOpacity style={[styles.watchListBttn]}>
									<Text style={styles.bttnText}>Add to Watchlist</Text>
								</TouchableOpacity>
							</TouchableWithoutFeedback>
						</View>
					</TouchableOpacity>
				</TouchableWithoutFeedback>)
			}
			<TouchableOpacity onPress={() => { navigation.goBack() }}>
				<Text style={styles.button}>
					Go back
				</Text>
			</TouchableOpacity>
		</ParallaxScrollView>
	);
};

export default TopPage;

const styles = StyleSheet.create({
	avatar: {
		width: 30, 
		height: 30,
		marginRight: 10
	},
	date: {
		marginLeft: 'auto'
	},
	imageBackground: {
		width: '100%',
		height: 180
	},
	background: {
		flex: 1,
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		padding: 10
	},
	imageText: {
		color: 'white',
		fontFamily: 'Inter-Medium'
	},
	poster: {
		height: 200,
		width: 134
	},
	text: {
		fontFamily: 'Inter-Regular',
		color: '#122737',
		letterSpacing: 0.4
	},
	title: {
		marginTop: 'auto',
		fontFamily: 'Inter-Black',
		fontSize: 32,
		letterSpacing: 0.4,
		marginBottom: 10
	},
	horizontalContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	description: {
		margin: 10,
		fontSize: 16,
		marginBottom: 20
	},
	topItem: {
		margin: 10,
		flexDirection: 'row'
	},
	number: {
		fontSize: 18,
		lineHeight: 25,
		color: 'white',
		fontFamily: 'Inter-Bold',
		width: 25,
		height: 25,
		backgroundColor: '#FF6501',
		marginRight: 5,
		textAlign: 'center'
	},
	movieTitle: {
		fontSize: 18,
		fontFamily: 'Inter-Medium',
		lineHeight: 25,
		flex: 1,
	},
	titleContainer: {
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'flex-start',
		width: '100%'
	},
	comment: {
		fontSize: 16
	},
	button: {
		width: 175,
		height: 37,
		backgroundColor: '#FF6501',
		marginTop: 22,
		borderRadius: 55,
		textAlign: 'center',
		lineHeight: 36,
		fontSize: 18,
		color: 'white',
		fontFamily: 'Inter-SemiBold',
		margin: 20,
		alignSelf: 'center'
	},
	watchListBttn: {	
		width: 130,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		height: 25,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FF6501',
		marginTop: 20,
		borderRadius: 55,
		padding: 2,
		marginBottom: 10
	},
	bttnText: {
		fontFamily: 'Inter-Medium',
		color: 'white'
	}
})