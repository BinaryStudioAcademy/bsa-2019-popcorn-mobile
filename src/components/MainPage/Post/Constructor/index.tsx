import React, { Component } from 'react';
import {
	Image,
	Keyboard,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendPost } from '../actions';
import IPost from '../IPost';
import IUser from '../../../UserPage/IUser';
import ChooseExtra from './ChooseExtra';
import Spinner from '../../../Spinner/Spinner';
import Extra from './Extra';
import ImageUploader from '../../../ImageUploader';
import config from '../../../../config';

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
	data: { id: string | null; title: string | null; image?: string } | null;
	type: string;
	loading: boolean;
	hide: boolean;
}

class PostConstructor extends Component<IProps, IState> {
	state = {
		description: '',
		image_url: '',
		modalVisible: false,
		disabled: true,
		data: { id: null, title: null, image: '' },
		type: '',
		loading: false,
		hide: true
	};

	keyboardDidShowListener;
	keyboardDidHideListener;

	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this.keyboardDidShow.bind(this)
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this.keyboardDidHide.bind(this)
		);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	keyboardDidShow = () => {
		this.setState({ hide: false });
	};

	keyboardDidHide = () => {
		this.setState({ hide: true });
	};

	validate(description = this.state.description) {
		const { data, image_url } = this.state;
		if ((data && data.id) || (description && image_url)) {
			this.setState({ disabled: false });
		} else {
			this.setState({ disabled: true });
		}
	}

	hasActivityOrPhoto(number: number) {
		return this.state.type || this.state.image_url ? {} : { flex: number };
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.state.data !== prevState.data) {
			let newImage = '';
			if (this.state.data) {
				if (this.state.data.image) {
					newImage = this.state.data.image;
				} else {
					switch (this.state.type) {
						case 'top':
							newImage = config.DEFAULT_TOP_IMAGE;
							break;
						case 'event':
							newImage = config.DEFAULT_EVENT_IMAGE;
							break;
						case 'survey':
							newImage = config.DEFAULT_SURVEY_IMAGE;
					}
				}
			}
			this.setState({ image_url: newImage });
			this.validate();
		}
	}

	addExtra(item, option) {
		this.setState({
			type: option,
			data: item
		});
	}

	clearExtra = () => {
		this.addExtra({ id: null, title: null }, '');
		this.setState({ type: '', data: null, image_url: '' });
		this.validate();
	};

	clearState = () => {
		this.addExtra({ id: null, title: null }, '');
		this.setState({ type: '', data: null, image_url: '', description: '' });
		this.validate();
	};

	render() {
		if (this.state.loading) return <Spinner />;
		const { image_url, description, data, type } = this.state;
		const { navigation, profileInfo } = this.props;
		if (navigation.state.params) {
			const { option, type } = navigation.state.params;
			navigation.state.params = null;
			if (!data || data.id !== option.id) this.addExtra(option, type);
		}
		return (
			<View style={[styles.mainView, this.hasActivityOrPhoto(1)]}>
				<View style={styles.buttonWrp}>
					<TouchableOpacity
						style={{ width: '50%', alignItems: 'flex-start' }}
						onPress={() => navigation.navigate('Home')}
					>
						<SvgUri height={40} width={40} source={arrow} />
					</TouchableOpacity>
					<TouchableOpacity
						style={{ width: '50%', alignItems: 'flex-end' }}
						onPress={() => {
							this.props.sendPost({
								id: uuid(),
								...this.state,
								extraTitle: data && data.title,
								extraLink: data && `/events/${data.id}`,
								extraType: type,
								extraData: data,
								user: { ...this.props.profileInfo }
							});
							this.clearState();
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
				{image_url || type ? (
					<View>
						{image_url ? (
							<View style={styles.UploadWrp}>
								<Image style={styles.roundImage} source={{ uri: image_url }} />
							</View>
						) : null}
						<View>
							{type && this.state.hide ? (
								<Extra
									user={profileInfo}
									type={type}
									data={data}
									navigation={navigation}
									clearExtra={this.clearExtra}
								/>
							) : null}
						</View>
					</View>
				) : null}

				<View
					style={[styles.iconsWrp, { flex: 2 }, this.hasActivityOrPhoto(5)]}
				>
					<TextInput
						textAlignVertical={'top'}
						multiline={true}
						numberOfLines={4}
						style={styles.input}
						value={description}
						onChangeText={description => {
							this.setState({ description });
							this.validate(description);
						}}
					/>
				</View>
				{this.state.hide && (
					<View style={this.hasActivityOrPhoto(1)}>
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
							<View style={[{ marginRight: 15 }, styles.activity]}>
								<ImageUploader
									startUpload={() => this.setState({ loading: true })}
									saveUrl={(image_url: string) => {
										this.clearExtra();
										this.setState({ image_url, loading: false });
										this.validate();
									}}
								>
									<SvgUri width={50} height={50} source={camera} />
								</ImageUploader>
								<Text style={styles.colorTextActivity}>Image</Text>
							</View>
						</View>
					</View>
				)}
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
