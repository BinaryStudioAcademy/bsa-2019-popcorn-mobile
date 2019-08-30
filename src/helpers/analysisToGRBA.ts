const MIN_OPACITY = 0.5;
const MAX_OPACITY = 0.7;

const green = {
	MIN_RATE: 0.7,
	MAX_RATE: 3,
	setResult: opacity => `rgba(0, 255, 0, ${opacity})`
};
const yellow = {
	MIN_RATE: -0.5,
	MAX_RATE: 0.7,
	setResult: opacity => `rgba(255, 255, 0, ${opacity})`
};
const red = {
	MIN_RATE: -3,
	MAX_RATE: -0.5,
	setResult: opacity => `rgba(255, 0, 0, ${opacity})`
};

const DEFAULT_RGBA = 'rgba(255, 255, 255, 1)';

export const analysisToGRBA = (analysis: string): string => {
	const rate = +analysis;
	if (isNaN(rate)) {
		return DEFAULT_RGBA;
	}
	if (rate >= green.MIN_RATE) {
		if (rate > green.MAX_RATE) {
			return green.setResult(MAX_OPACITY);
		}
		const result = getOpacityValue(green, rate);
		return green.setResult(result);
	}
	if (rate >= yellow.MIN_RATE && rate <= yellow.MAX_RATE) {
		return yellow.setResult((MAX_OPACITY + MIN_OPACITY) / 2);
	}
	if (rate <= red.MAX_RATE) {
		if (rate < red.MIN_RATE) {
			return red.setResult(MAX_OPACITY);
		}
		let result = getOpacityValue(red, rate);
		if (result < MIN_OPACITY) {
			result = MIN_OPACITY;
		}
		return red.setResult(result);
	}
	return 'rgba(255, 0, 0, 0.2)';
};

const getOpacityValue = (color, rate) =>
	Math.abs(
		((rate - MIN_OPACITY) * (MAX_OPACITY - MIN_OPACITY)) /
			(color.MAX_RATE - color.MIN_RATE) +
			MIN_OPACITY
	);
