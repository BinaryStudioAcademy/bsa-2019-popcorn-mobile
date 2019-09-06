import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import styles from './styles';
import Moment from 'moment';

interface IProps {
    preview: any;
    navigation: any;
}

const CollectionsListItem: React.FC<IProps> = ({ preview, navigation }) => {
    const { createdAt, title, description, user, imageUrl, moviesId } = preview;
    const image = imageUrl ? imageUrl : 'https://www.goldderby.com/wp-content/uploads/2017/12/Oscar-statuette-trophy-atmo.png';
    return (
        <TouchableOpacity
			style={styles.main}
			onPress={() => {
				navigation.navigate('CollectionPage', { id: preview.id })
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
					<Text numberOfLines={2} style={styles.title}>{title}</Text>
					<Text numberOfLines={3} style={[styles.text]}>
						{description}
					</Text>
				</View>
				<View style={styles.thirdColumn}>
					<View style={styles.userInfo}>
                        <TouchableWithoutFeedback>
                            <TouchableOpacity onPress={() => { 
                                navigation.navigate('UserPage', { userId: user.id }) 
                            }}>
						<Image
							source={{
								uri:
									user.avatar ||
									'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png'
							}}
							style={styles.roundImage}
						/>
                        </TouchableOpacity>
                        </TouchableWithoutFeedback>
					</View>
					<Text style={[styles.text, styles.movieAmount]}>
						{moviesId.length} movies
					</Text>
					<Text style={[styles.text, styles.date]}>
						{Moment(createdAt).format('ll')}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
    );
}

export default CollectionsListItem;