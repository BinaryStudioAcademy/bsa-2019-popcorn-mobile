import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import ColorPalette from 'react-native-color-palette';
import INewStory from '../INewStory';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface IProps {
	setNewStory: ({ newStory, data }: { newStory: INewStory; data: any }) => void;
	newStory: INewStory;
	data: any;
	paletteType: string;
}

interface IState {
	color: string;
}

export class ColorPicker extends React.Component<IProps, IState> {
	renderColorPalette = () => {
		const { paletteType } = this.props;
		return (
			<ScrollView>
				<ColorPalette
					onChange={color =>
						this.props.setNewStory({
							newStory: {
								...this.props.newStory,
								[paletteType]: color
							},
							data: this.props.data
						})
					}
					value={this.props.newStory[paletteType]}
					colors={[
						'#fff8e1',
						'#C0392B',
						'#E74C3C',
						'#ff9e80',
						'#9B59B6',
						'#8eacbb',
						'#2980B9',
						'#f06292',
						'#ff94c2',
						'#0077c2',
						'#00675b',
						'#8bc34a',
						'#ffa000',
						'#34515e',
						'#78909c'
					]}
					title={null}
					icon={
						<Icon name={'circle'} size={20} color={'rgba(255,255,255,0.2)'} />
					}
					paletteStyles={styles.colorPicker}
				/>
			</ScrollView>
		);
	};

	render() {
		const { paletteType } = this.props;
		let colorIcon = paletteType === 'backgroundColor' ? 'palette' : 'brush';
		return (
			<View style={styles.colorPaletteWrap}>
				<TouchableOpacity style={styles.colorPalette}>
					<FontAwesome5
						name={colorIcon}
						color={'#555'}
						size={20}
						style={styles.colorIcon}
					/>
				</TouchableOpacity>
				{this.renderColorPalette()}
			</View>
		);
	}
}
export default ColorPicker;
