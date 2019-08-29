import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../../../Header/Header';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendStory } from '../actions';
import INewStory from '../INewStory';
import Spinner from '../../../Spinner/Spinner';
import ImageUploader from '../../../ImageUploader';
import Extra from './Extra';
import IUser from '../../../UserPage/IUser';
const poll = require('../../../../assets/general/Poll-01.svg');
const camera = require('../../../../assets/general/camera.svg');
const cup = require('../../../../assets/general/trophy.svg');
const calendar = require('../../../../assets/general/calendar.svg');
const uuid = require('uuid/v4');

interface IProps {
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
			'https://i.pinimg.com/736x/2c/f1/93/2cf193ee4bef23eb1a2a9b07faadd951.jpg',
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
			<View style={styles.mainView}>
				<View>
					<View style={styles.UploadWrp}>
						{/* <ImageUploader
							startUpload={() => this.setState({ loading: true })}
							saveUrl={(image_url: string) => {
								this.setState({ image_url, loading: false });
								this.validate();
							}}
						> */}
						{image_url ? (
							<Image style={styles.roundImage} source={{ uri: image_url }} />
						) : (
							<SvgUri
								style={styles.center}
								width={50}
								height={50}
								source={camera}
							/>
						)}
						{/* </ImageUploader> */}
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

				<View>
					<View style={styles.iconsWrp}>
						<TextInput
							textAlignVertical={'top'}
							multiline={true}
							numberOfLines={4}
							style={styles.input}
							value={caption}
							onChangeText={caption => {
								this.setState({ caption });
								this.validate();
							}}
						/>
					</View>
					<View style={styles.iconsWrp}>
						<TouchableOpacity
							style={{ marginRight: 15 }}
							onPress={() =>
								this.props.navigation.navigate('ChooseExtraOption', {
									addExtra: this.addExtra,
									option: 'survey'
								})
							}
						>
							<SvgUri width={50} height={50} source={poll} />
						</TouchableOpacity>
						<TouchableOpacity
							style={{ marginRight: 15 }}
							onPress={() =>
								this.props.navigation.navigate('ChooseExtraOption', {
									addExtra: this.addExtra,
									option: 'top'
								})
							}
						>
							<SvgUri width={50} height={50} source={cup} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() =>
								this.props.navigation.navigate('ChooseExtraOption', {
									addExtra: this.addExtra,
									option: 'event'
								})
							}
						>
							<SvgUri width={50} height={50} source={calendar} />
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={styles.buttonWrp}
						onPress={() => {
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
			</View>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	profileInfo: rootState.authorization.profileInfo
});

const actions = {
	sendStory
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryModal);
