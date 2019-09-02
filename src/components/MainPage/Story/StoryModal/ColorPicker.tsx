import React from 'react';
import { View, Text } from 'react-native';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import hexToRgba from 'hex-to-rgba';

interface IProps {
	navigation: any;
}

interface IState {
	color: string;
}

export class ControlledVertical extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = { color: '#fff' };
		this.onColorChange = this.onColorChange.bind(this);
	}

	onColorChange(colorHsv) {
		const color = fromHsv(colorHsv);
		this.setState({ color });
		const { setColor } = this.props.navigation.state.params;
		setColor(hexToRgba(color));
	}

	render() {
		return (
			<View style={{ flex: 1, padding: 15, backgroundColor: '#212021' }}>
				<Text style={{ color: 'white' }}>{this.state.color}</Text>
				<ColorPicker
					oldColor="purple"
					color={this.state.color}
					onColorChange={this.onColorChange}
					onColorSelected={this.onColorChange}
					style={{ flex: 1 }}
					defaultColor={'green'}
				/>
			</View>
		);
	}
}
export default ControlledVertical;
