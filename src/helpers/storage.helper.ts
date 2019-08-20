import AsyncStorage from '@react-native-community/async-storage';

const AppNameSpace = 'popcorn:';

const set = async (key, value) => {
	try {
		await AsyncStorage.setItem(AppNameSpace + key, value);
	} catch (e) {
		console.log(e);
	}
};

const get = async key => {
	let value: string | null = null;
	try {
		value = await AsyncStorage.getItem(AppNameSpace + key);
	} catch (e) {
		console.log(e);
	}
	return value;
};

const Storage = {
	get,
	set
};

export { Storage };
