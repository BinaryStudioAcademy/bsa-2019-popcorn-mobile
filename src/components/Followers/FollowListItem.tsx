import React from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import styles from './ListStyles';

interface IProps {
	navigation: any;
	item: any;
}

const FollowListItem: React.FC<IProps> = ({ item, navigation }) => {
	let user;
	if (item.user) user = item.user;
	if (item.follower) user = item.follower;
	return (
		<TouchableOpacity
			style={styles.follower}
			onPress={() => {
				navigation.navigate('UserPage', {
					userId: user.id
				});
				navigation.navigate('Profile');
			}}
		>
			<View style={styles.imageContainer}>
				<Image
					source={{
						uri:
							user.avatar ||
							'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png'
					}}
					style={styles.avatar}
				/>
			</View>
			<Text style={styles.name}>{user.name}</Text>
		</TouchableOpacity>
	);
};

export default FollowListItem;
