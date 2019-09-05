import React from 'react';
import {
	View,
	ImageBackground,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	faTimes,
	faPlusCircle,
	faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import config from './../../../config';
const { width } = Dimensions.get('window');

interface IProps {
	watchItem: any;
	removeFromWatchlist: (id, userId) => any;
	updateWatchlistItem: (id, userId) => any;
	userId: string;
}

class WatchListItem extends React.Component<IProps> {
	render() {
		const { removeFromWatchlist, updateWatchlistItem, userId } = this.props;
		const { status, id } = this.props.watchItem;
		const {
			poster_path,
			title,
			id: movieId,
			release_date
		} = this.props.watchItem.movie;
		return (
			<View style={styles.watchItemWrapper}>
				<ImageBackground
					source={{ uri: config.POSTER_PATH + poster_path }}
					resizeMode="contain"
					style={styles.poster}
				>
					<View style={styles.controlsWrapper}>
						<View style={styles.updateControlWrapper}>
							{status === 'watched' ? (
								<FontAwesomeIcon
									style={{ ...styles.updateControl, color: 'rgb(73, 199, 54)' }}
									icon={faCheckCircle}
									size={20}
								/>
							) : (
								<TouchableOpacity
									onPress={() => updateWatchlistItem(id, userId)}
								>
									<FontAwesomeIcon
										style={styles.updateControl}
										icon={faPlusCircle}
										size={20}
									/>
								</TouchableOpacity>
							)}
						</View>
						<View style={styles.removeControlWrapper}>
							<TouchableOpacity onPress={() => removeFromWatchlist(id, userId)}>
								<FontAwesomeIcon
									style={styles.removeControl}
									icon={faTimes}
									size={20}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
				<Text style={styles.title}>
					{title}
					<Text>
						{release_date ? ' (' + release_date.slice(0, 4) + ')' : null}
					</Text>
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	watchItemWrapper: {
		width: width / 2 - 10,
		margin: 5
	},
	poster: {
		width: '100%',
		minHeight: 250
	},
	title: {
		fontFamily: 'Inter-Regular',
		fontSize: 17,
		lineHeight: 20,
		letterSpacing: 0.4,
		padding: 5,
		color: 'rgb(18, 39, 55)'
	},
	removeControl: {
		padding: 8,
		height: 25,
		color: 'white',
		borderRadius: 16,
		backgroundColor: 'rgba(0, 0, 0, 0.726)'
	},
	controlsWrapper: {
		width: '100%',
		flexDirection: 'row'
	},
	removeControlWrapper: {
		marginLeft: 'auto',
		marginRight: 15,
		marginTop: 5
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
	}
});

export default WatchListItem;
