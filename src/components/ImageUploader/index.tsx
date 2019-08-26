import ImagePicker from 'react-native-image-picker';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';

interface IProps {
	saveUrl: (url: string) => void;
	src: any;
}

class ImageUploader extends React.Component<IProps> {
	showPicker() {
		ImagePicker.showImagePicker({}, response => {
			if (response.didCancel || !response.data) return;
			const file = response.data;

			const data = new FormData();
			data.append('file', file);
		});
	}

	render() {
		return (
			<TouchableOpacity onPress={this.showPicker}>
				<SvgUri height={48} width={48} source={this.props.src} />
			</TouchableOpacity>
		);
	}
}

export default ImageUploader;
