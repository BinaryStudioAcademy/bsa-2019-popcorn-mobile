import ImagePicker from 'react-native-image-picker';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { uploadBase64, uploadFile } from '../../services/file.service';

interface IProps {
	startUpload?: () => any;
	saveUrl: (url: string) => any;
	src?: any;
}

class ImageUploader extends React.Component<IProps> {
	showPicker(saveUrl: (url: string) => any) {
		ImagePicker.showImagePicker({}, response => {
			if (response.didCancel || !response.data) return;

			this.props.startUpload && this.props.startUpload();

			uploadBase64(response.data, response.type || '')
				// uploadFile(response.data, response.type || '')
				.then(saveUrl)
				.catch(e => alert(JSON.stringify(e.message)));
		});
	}

	render() {
		const { saveUrl, src, children } = this.props;
		return (
			<TouchableOpacity
				style={{ height: 'auto' }}
				onPress={() => {
					this.showPicker(saveUrl);
				}}
			>
				{src ? (
					<SvgUri height={48} width={48} source={this.props.src} />
				) : (
					children
				)}
			</TouchableOpacity>
		);
	}
}

export default ImageUploader;
