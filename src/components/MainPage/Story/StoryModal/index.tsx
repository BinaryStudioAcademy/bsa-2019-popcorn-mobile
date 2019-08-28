// import React, { Component, Fragment } from 'react';
// import {
// 	View,
// 	Text,
// 	TextInput,
// 	StyleSheet,
// 	TouchableOpacity,
// 	Alert
// } from 'react-native';

// class StoryModal extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			text: '',
// 			disableButton: false
// 		};
// 	}
// 	onChangeText = value => {
// 		!value.match(/^(?!\s*$).*/)
// 			? this.setState({ disableButton: false, text: value })
// 			: this.setState({ disableButton: true, text: value });
// 	};
// 	onPress = () => {
// 		// Alert.alert('You pressed! State=', this.state);
// 	};
// 	render() {
// 		return (
// 			<Fragment>
// 				<View style={styles.container}>
// 					<Text>Add story here</Text>
// 					<TextInput
// 						style={[styles.text, styles.input]}
// 						placeholder="Enter a title for the story"
// 						onChangeText={this.onChangeText}
// 					/>
// 				</View>
// 				<TouchableOpacity
// 					style={styles.buttonWrap}
// 					disabled={!this.state.disableButton}
// 					onPress={this.onPress}
// 				>
// 					<Text
// 						style={[
// 							styles.text,
// 							styles.button,
// 							{ backgroundColor: this.state.disableButton ? '#FF6501' : 'grey' }
// 						]}
// 					>
// 						Send
// 					</Text>
// 				</TouchableOpacity>
// 			</Fragment>
// 		);
// 	}
// }
// const styles = StyleSheet.create({
// 	container: {
// 		width: 300,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		padding: '3%'
// 	},
// 	input: {
// 		marginTop: 20,
// 		width: '80%',
// 		marginBottom: 20,
// 		borderColor: 'rgba(0, 0, 0, 0.11)',
// 		borderWidth: 1,
// 		padding: 12,
// 		paddingLeft: 15,
// 		fontSize: 15,
// 		borderRadius: 3
// 	},
// 	buttonWrap: {
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		marginBottom: 29
// 	},
// 	button: {
// 		width: 80,
// 		lineHeight: 20,
// 		marginTop: 15,
// 		borderRadius: 5,
// 		textAlign: 'center',
// 		fontSize: 15,
// 		color: 'white',
// 		fontFamily: 'Inter-SemiBold'
// 	},
// 	message: {
// 		marginTop: 19,
// 		flexDirection: 'row'
// 	},
// 	text: {
// 		letterSpacing: 0.4,
// 		fontFamily: 'Inter-Regular'
// 	},
// 	secondaryText: {
// 		color: 'rgba(0, 0, 0, 0.8)'
// 	}
// });

// export default StoryModal;

import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../../../Header/Header';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendStory } from '../actions';
// import IPost from '../IPost';
import INewStory from '../INewStory';

import IUser from '../../../UserPage/IUser';
import ImageUploader from '../../../ImageUploader';
import ChooseExtra from './ChooseExtra';
import Extra from './Extra';
import Spinner from '../../../Spinner/Spinner';

const camera = require('../../../../assets/general/camera.svg');
const paperclip = require('../../../../assets/general/paperclip.svg');
const uuid = require('uuid/v4');

interface IProps {
	// sendPost: (post: IPost) => any;
	sendStory: ({ newStory: INewStory, userId: string }) => any;
	profileInfo: IUser;
	navigation: any;
}

interface IState {
	caption: string;
	image_url: string;
	modalVisible: boolean;
	disabled: boolean;
	data: any;
	type: string;
	loading: boolean;
}

class StoryModal extends Component<IProps, IState> {
	state = {
		image_url:
			'https://i.kym-cdn.com/photos/images/newsfeed/001/394/314/c62.jpg',
		activity: null,
		caption: '',
		modalVisible: false,
		disabled: true,
		data: { id: null, title: null },
		type: '',
		loading: false
	};

	validate() {
		const { caption, image_url } = this.state;
		if (caption && image_url) this.setState({ disabled: false });
		else this.setState({ disabled: true });
	}
	addExtra(item, option) {
		this.setState({
			type: option,
			data: item
		});
	}

	render() {
		if (this.state.loading) return <Spinner />;

		const { image_url, caption, data, type } = this.state;

		const { navigation, profileInfo } = this.props;

		if (navigation.state.params) {
			const { option, type } = navigation.state.params;
			navigation.state.params = null;
			if (data.id !== option.id) this.addExtra(option, type);
		}
		return (
			<View style={styles.container}>
				<Header navigation={navigation} />
				<View style={styles.mainView}>
					<View style={styles.iconsWrp}>
						<Image style={styles.roundImage} source={{ uri: image_url }} />
					</View>
					<View style={styles.iconsWrp}>
						<TextInput
							style={styles.input}
							value={caption}
							onChangeText={caption => {
								this.setState({ caption });
								this.validate();
							}}
						/>
					</View>
				</View>
				<View style={styles.IconExtraWrp}>
					<View style={styles.iconsWrp}>
						<ImageUploader
							startUpload={() => this.setState({ loading: true })}
							saveUrl={(image_url: string) => {
								this.setState({ image_url, loading: false });
								this.validate();
							}}
							src={camera}
						/>
						<TouchableOpacity
							onPress={() =>
								this.props.navigation.navigate('ChooseExtra', {
									addExtra: this.addExtra
								})
							}
						>
							<SvgUri height={48} width={48} source={paperclip} />
						</TouchableOpacity>
					</View>
					{type && data.id ? (
						<Extra
							user={profileInfo}
							type={type}
							data={data}
							navigation={navigation}
							clearExtra={() => {
								this.addExtra({ id: null, title: null }, '');
							}}
						/>
					) : null}
				</View>
				<TouchableOpacity
					style={styles.buttonWrp}
					onPress={() => {
						// this.props.sendPost({
						// 	id: uuid(),
						// 	...this.state,
						// 	user: { ...this.props.profileInfo }
						// });
						this.props.sendStory({
							newStory: { ...this.state },
							userId: this.props.profileInfo.id
						});
						navigation.navigate('Home');
					}}
					disabled={this.state.disabled}
				>
					<Text
						style={[
							styles.button,
							this.state.disabled ? styles.disabledBtn : {}
						]}
					>
						Save
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.authorization.profileInfo
});

const actions = {
	// sendPost,
	sendStory
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryModal);
