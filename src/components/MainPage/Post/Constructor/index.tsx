import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../../../Header/Header';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendPost } from '../actions';
import IPost from '../IPost';
import IUser from '../../../UserPage/IUser';
import ImageUploader from '../../../ImageUploader';
import ChooseExtra from './ChooseExtra';
import Extra from './Extra';
import Spinner from '../../../Spinner/Spinner';

const camera = require('../../../../assets/general/camera.svg');
const paperclip = require('../../../../assets/general/paperclip.svg');
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
			<View style={{ flex: 1 }}>
				<Header navigation={navigation} />
				<View style={styles.mainView}>
					<View style={styles.iconsWrp}>
						<Image style={styles.roundImage} source={{ uri: image_url }} />
					</View>
					<View style={styles.iconsWrp}>
						<TextInput
							style={styles.input}
							value={description}
							onChangeText={description => {
								this.setState({ description });
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
						this.props.sendPost({
							id: uuid(),
							...this.state,
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
	sendPost
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PostConstructor);
