import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendPost } from '../actions';
import IPost from '../IPost';
import IUser from '../../../UserPage/IUser';
import Spinner from '../../../Spinner/Spinner';
import ImageUploader from '../../../ImageUploader';
import Extra from './Extra';

const poll = require('../../../../assets/general/Poll-01.svg');
const camera = require('../../../../assets/general/camera.svg');
const cup = require('../../../../assets/general/trophy.svg');
const calendar = require('../../../../assets/general/calendar.svg');
const arrow = require('../../../../assets/general/arrow-circle-o-left.svg');
const uuid = require('uuid/v4');

interface IProps {
	sendPost: (post: IPost) => any;
	profileInfo: IUser;
	navigation: any;
}

interface IState {
	description: string;
	image_url: string;
	modalVisible: boolean;
	disabled: boolean;
	data: any;
	type: string;
	loading: boolean;
}

class PostConstructor extends Component<IProps, IState> {
	state = {
		description: '',
		image_url: '',
		modalVisible: false,
		disabled: true,
		data: { id: null, title: null },
		type: '',
		loading: false
	};

	validate() {
		const { description, image_url } = this.state;
		if (description && image_url) this.setState({ disabled: false });
		else this.setState({ disabled: true });
	}
	hasActivity() {
		return !!this.state.type;
	}

	addExtra(item, option) {
		this.setState({
			type: option,
			data: item
		});
	}

	render() {
		if (this.state.loading) return <Spinner />;

		const { image_url, description, data, type } = this.state;

		const { navigation, profileInfo } = this.props;

		if (navigation.state.params) {
			const { option, type } = navigation.state.params;
			navigation.state.params = null;
			if (data.id !== option.id) this.addExtra(option, type);
		}
		return (
			<View style={styles.mainView}>
				<View style={styles.buttonWrp}>
					<TouchableOpacity
						style={{ width: '50%', alignItems: 'flex-start' }}
						onPress={() => null}
					>
						<SvgUri height={48} width={48} source={arrow} />
						{/*<Text*/}
						{/*    style={[styles.button]}*/}
						{/*>*/}
						{/*    Cancel*/}
						{/*</Text>*/}
					</TouchableOpacity>
					<TouchableOpacity
						style={{ width: '50%', alignItems: 'flex-end' }}
						onPress={() => {
							this.props.sendPost({
								id: uuid(),
								...this.state,
								extraTitle: data.title,
								user: { ...this.props.profileInfo }
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
							Post
						</Text>
					</TouchableOpacity>
				</View>
				<View>
					<View style={styles.UploadWrp}>
						<ImageUploader
							startUpload={() => this.setState({ loading: true })}
							saveUrl={(image_url: string) => {
								this.setState({ image_url, loading: false });
								this.validate();
							}}
						>
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
						</ImageUploader>
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
							value={description}
							onChangeText={description => {
								this.setState({ description });
								this.validate();
							}}
						/>
					</View>
					<View style={styles.iconsWrp}>
						<TouchableOpacity
							style={[{ marginRight: 15 }, styles.activity]}
							onPress={() =>
								this.props.navigation.navigate('ChooseExtraOption', {
									addExtra: this.addExtra,
									option: 'survey'
								})
							}
						>
							<SvgUri width={50} height={50} source={poll} />
							<Text style={styles.colorTextActivity}>Survey</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[{ marginRight: 15 }, styles.activity]}
							onPress={() =>
								this.props.navigation.navigate('ChooseExtraOption', {
									addExtra: this.addExtra,
									option: 'top'
								})
							}
						>
							<SvgUri width={50} height={50} source={cup} />
							<Text style={styles.colorTextActivity}>Top</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[{ marginRight: 15 }, styles.activity]}
							onPress={() =>
								this.props.navigation.navigate('ChooseExtraOption', {
									addExtra: this.addExtra,
									option: 'event'
								})
							}
						>
							<SvgUri width={40} height={40} source={calendar} />
							<Text style={styles.colorTextActivity}>Event</Text>
						</TouchableOpacity>
					</View>
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
	sendPost
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostConstructor);
