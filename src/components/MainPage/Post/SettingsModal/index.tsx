import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	Dimensions,
	Modal
} from 'react-native';
const { width, height } = Dimensions.get('window');
interface IProps {
	postId: string;
	deletePost: (postId: string) => any;
	toggleModal: () => any;
}

const SettingsModal = (props: IProps) => {
	return (
		<>
			<Modal
				animationType={'fade'}
				transparent={true}
				visible={true}
				onRequestClose={() => props.toggleModal()}
			>
				<View style={styles.modalWrapper}>
					<View style={styles.modalBody}>
						<TouchableOpacity
							onPress={() => (
								props.deletePost(props.postId), props.toggleModal()
							)}
						>
							<Text style={styles.modalControlText}>Delete post</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => props.toggleModal()}>
							<Text
								style={[styles.modalControlText, styles.modalControlTextRed]}
							>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	modalWrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.3)'
	},
	modalBody: {
		backgroundColor: 'rgb(255, 255, 255)',
		width: 200,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15
	},
	modalControlText: {
		fontFamily: 'Inter-Regular',
		fontSize: 17,
		lineHeight: 35,
		letterSpacing: 0.4,
		color: 'rgb(18, 39, 55)'
	},
	modalControlTextRed: {
		color: '#ff6501'
	}
});

export default SettingsModal;
