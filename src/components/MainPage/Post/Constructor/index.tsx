import React, { Component } from 'react';
import {
	Image,
	Modal,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';
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
	title: string | null;
	link: string | null;
}

class PostConstructor extends Component<IProps, IState> {
	state = {
		description: '',
		image_url: '',
		modalVisible: false,
		title: null,
		link: null
	};

	addExtra(item, option) {
		this.setState({
			title: item.title,
			link: `/${option}-page/${item.id}`
		});
	}

	render() {
		const { image_url, description, title } = this.state;

		if (this.props.navigation.state.params) {
			const { option, type } = this.props.navigation.state.params;
			if (title !== option.title) this.addExtra(option, type);
		}
		return (
			<View style={{ flex: 1 }}>
				<Header />
				<View style={styles.mainView}>
					<View style={styles.iconsWrp}>
						<Image style={styles.roundImage} source={{ uri: image_url }} />
					</View>
					<View style={styles.iconsWrp}>
						<TextInput
							style={styles.input}
							value={description}
							onChangeText={description => this.setState({ description })}
						/>
					</View>
				</View>
				<View style={styles.iconsWrp}>
					<ImageUploader
						saveUrl={(image_url: string) => {
							alert(image_url);
							this.setState({ image_url });
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
				<TouchableOpacity
					style={styles.buttonWrp}
					onPress={
						() => null
						// this.props.sendPost({
						//     id: uuid(),
						//     ...this.state,
						//     user: {...this.props.profileInfo}
						// })
					}
				>
					<Text style={styles.button}>Save</Text>
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
