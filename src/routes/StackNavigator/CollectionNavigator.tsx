import { createStackNavigator } from 'react-navigation';
import CollectionList from '../../views/CollectionsView';
import Collection from '../../components/Collections/Collection';

const CollectionNavigator = createStackNavigator({
	CollectionsList: {
		screen: CollectionList,
		navigationOptions: {
			header: null
		}
	},
	CollectionPage: {
		screen: Collection,
		navigationOptions: {
			header: null
		}
	}
});

export default CollectionNavigator;