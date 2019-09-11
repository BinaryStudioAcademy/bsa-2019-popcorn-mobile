import React, { useState } from 'react';
import {
	Modal,
	FlatList,
	TextInput,
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IComment from './../IComment';
import { createComment } from './../actions';
import Comment from '../Comment';

const { width } = Dimensions.get('window');

interface IProps {
	comments: IComment[];
	userId: string;
	postId: string;
	createComment: (userId: string, text: string, postId: string) => any;
	toggleModal: () => void;
}

const CommentsModal = (props: IProps) => {
	const [commentBody, setCommentBody] = useState('');

	const renderComment = ({ item }) => <Comment comment={item} />;

	const onPostPress = () => (
		props.createComment(props.userId, commentBody, props.postId),
		setCommentBody('')
	);

	return (
		<Modal
			animationType={'fade'}
			transparent={false}
			visible={true}
			onRequestClose={() => props.toggleModal()}
		>
			<View style={styles.modalBody}>
				<FlatList
					data={props.comments}
					keyExtractor={item => item.id}
					refreshing={false}
					renderItem={renderComment}
				/>
				<View style={styles.reactionInputWrapper}>
					<TextInput
						placeholderTextColor={'rgba(18, 39, 55, 0.6)'}
						onChangeText={value => setCommentBody(value)}
						value={commentBody}
						style={[styles.reactionInput, styles.reactionInputText]}
						placeholder={`Write your comment...`}
					/>

					{!!commentBody && (
						<View>
							<TouchableOpacity onPress={() => onPostPress()}>
								<Text style={[styles.reactionInputText, styles.bold]}>
									Post
								</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalBody: {
		flex: 1,
		width
	},
	reactionInputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		marginTop: 'auto',
		marginHorizontal: 8,
		borderRadius: 20,
		borderWidth: 0.8,
		borderColor: 'rgba(18, 39, 55, 0.7)'
	},
	reactionInputText: {
		color: 'rgba(18, 39, 55, 0.9)',
		fontFamily: 'Inter-Regular',
		fontSize: 14,
		lineHeight: 20,
		letterSpacing: 0.4,
		padding: 13,
		paddingTop: 7,
		paddingBottom: 7
	},
	reactionInput: {
		flex: 1
	},
	bold: {
		fontFamily: 'Inter-Bold'
	}
});

const actions = {
	createComment
};

const mapStateToProps = (rootState, props) => ({
	...props
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommentsModal);
