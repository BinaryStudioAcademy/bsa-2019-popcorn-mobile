import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import ColorPalette from 'react-native-color-palette';
import INewStory from '../INewStory';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

interface IProps {
	setNewStory: ({ newStory, data }: { newStory: INewStory; data: any }) => void;
	newStory: INewStory;
	data: any;
	paletteType: string;
	toogleBackgroundColor: () => void;
	isVisible: boolean
}

interface IState {
	color: string;
}

export class ColorPicker extends React.Component<IProps, IState> {
	renderColorPalette = () => {
		const { paletteType } = this.props;
		return (
			<ScrollView 
				keyboardShouldPersistTaps="always"
				horizontal={paletteType !== 'backgroundColor'}
				style={{ paddingTop: 0, paddingBottom: 0 }}
			> 
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
					paletteStyles={ this.props.paletteType === 'backgroundColor' ?
					 styles.colorPicker : { flexDirection: 'row' }
					}
				/>
			</ScrollView>
		);
	};

	render() {
		const { paletteType, isVisible, toogleBackgroundColor } = this.props;
		return (
			<>
			{
				paletteType === 'backgroundColor' &&
				<View style={[
					styles.colorPaletteWrap, 
					{ position: 'absolute', bottom: 5, left: 5, justifyContent:"flex-end", zIndex: 14 }
				]}>
					{
						isVisible &&
						this.renderColorPalette()
					}
					<TouchableOpacity style={styles.colorPalette} onPress={() => (toogleBackgroundColor())}>
						<View style={{ 
							width: 30, 
							height: 30, 
							borderRadius: 15, 
							borderWidth: 2, 
							borderColor: '#fff',
							backgroundColor: this.props.newStory.backgroundColor,
							marginTop: 10,
							shadowOpacity: 0.2,
							shadowRadius: 1.5,
							shadowOffset: { width: 1, height: 2 },
							elevation: 4, 
							marginHorizontal: 10,
							marginVertical: 10,

						}} />
					</TouchableOpacity>
				</View>
			}
			{
				paletteType !== 'backgroundColor' &&
				<View style={[
					{ position: 'absolute', bottom: 5, zIndex: 14, width: '100%', flexDirection: 'row' }
				]}>
					{
						this.renderColorPalette()
					}
				</View>
			}
			</>
		);
	}
}
export default ColorPicker;
