import ImagePicker from 'react-native-image-picker';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const camera = require('../../assets/general/camera.svg');

interface IProps {
	saveUrl: (url: string) => void;
	src: any;
}

class ImageUploader extends React.Component<IProps> {
	showPicker() {
		ImagePicker.showImagePicker({}, response => {
			alert(JSON.stringify(response));
		});
	}

	render() {
		return (
			<TouchableOpacity onPress={this.showPicker}>
				<SvgUri height={30} width={30} source={this.props.src} />
			</TouchableOpacity>
		);
	}
}

export default ImageUploader;
