import React, { Component } from 'react';
import { Button, Image, TextInput, View } from 'react-native';
import Header from '../../../Header/Header';
import styles from './styles';
import SvgUri from 'react-native-svg-uri';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendPost } from '../actions';
import IPost from '../IPost';
import IUser from '../../../UserPage/IUser';
import ImageUploader from '../../../ImageUploader';

const camera = require('../../../../assets/general/camera.svg');
const paperclip = require('../../../../assets/general/paperclip.svg');
const uuid = require('uuid/v4');

interface IProps {
	sendPost: (post: IPost) => any;
	profileInfo: IUser;
}

interface IState {
	description: string;
	image_url: string;
}

class PostConstructor extends Component<IProps, IState> {
	state = {
		description: '',
		image_url: ''
	};

	render() {
		const { image_url } = this.state;

		return (
			<View>
				<Header />
				{image_url ? (
					<View style={styles.iconsWrp}>
						<Image style={styles.roundImage} source={{ uri: image_url }} />
					</View>
				) : null}
				<View style={styles.iconsWrp}>
					<TextInput
						style={styles.input}
						value={this.state.description}
						onChangeText={description => this.setState({ description })}
					/>
				</View>
				<View style={styles.iconsWrp}>
					<ImageUploader
						saveUrl={(image_url: string) => {
							alert(image_url);
							this.setState({ image_url });
						}}
						src={camera}
					/>
					<SvgUri height={48} width={48} source={paperclip} />
				</View>
				<Button
					title={'Save'}
					disabled={false}
					onPress={() =>
						this.props.sendPost({
							id: uuid(),
							...this.state,
							user: { ...this.props.profileInfo }
						})
					}
				/>
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
