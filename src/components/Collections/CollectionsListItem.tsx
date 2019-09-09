import React from 'react';
import { IMovieListPreview } from './ICollection';
import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Image
} from 'react-native';
import styles from './styles';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes, faLock } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	preview: IMovieListPreview;
	navigation: any;
	deleteCollection: ({ movieListId: string }) => void;
	isOwner: () => boolean;
}

const CollectionsListItem: React.FC<IProps> = ({
	preview,
	navigation,
	deleteCollection,
	isOwner
}) => {
	const {
		title,
		imageUrl,
		description,
		moviesId,
		createdAt,
		isPrivate
	} = preview;
	const image = imageUrl
		? imageUrl
		: 'https://www.goldderby.com/wp-content/uploads/2017/12/Oscar-statuette-trophy-atmo.png';
	return (
		<TouchableOpacity
			style={styles.main}
			onPress={() => {
				navigation.navigate('Collection', { id: preview.id });
			}}
		>
			<View style={styles.container}>
				<View style={styles.firstColumn}>
					<Image
						source={{
							uri: image.includes('https') ? image : 'https://' + image
						}}
						style={{ width: 110, height: 80 }}
					/>
				</View>
				<View style={styles.secondColumn}>
					<Text numberOfLines={2} style={styles.title}>
						{isPrivate && (
							<FontAwesomeIcon
								icon={faLock}
								size={12}
								style={{ marginRight: 3, color: '#fb8700' }}
							/>
						)}{' '}
						{`${title}`}
					</Text>
					<Text numberOfLines={3} style={[styles.text]}>
						{description}
					</Text>
				</View>
				<View style={styles.thirdColumn}>
					<View style={styles.userInfo}>
						{isOwner() && (
							<TouchableWithoutFeedback>
								<TouchableOpacity
									onPress={() => {
										deleteCollection({ movieListId: preview.id });
									}}
								>
									<FontAwesomeIcon icon={faTimes} />
								</TouchableOpacity>
							</TouchableWithoutFeedback>
						)}
						{!isOwner() && (
							<Text style={[styles.text, styles.date]}>
								{Moment(createdAt).format('ll')}
							</Text>
						)}
					</View>
					<Text style={[styles.text, styles.movieAmount]}>
						{moviesId.length} movies
					</Text>
					{isOwner() && (
						<Text style={[styles.text, styles.date]}>
							{Moment(createdAt).format('ll')}
						</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default CollectionsListItem;
