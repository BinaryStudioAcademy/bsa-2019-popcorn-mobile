import React from 'react';
import { IMovieListPreview } from './ICollection';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

interface IProps {
    preview: IMovieListPreview;
    navigation: any;
}

const CollectionsListItem: React.FC<IProps> = ({ preview, navigation }) => {
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('CollectionPage', { id: preview.id }) }}>
            <Text>{preview.title}</Text>
        </TouchableOpacity>
    )
}

export default CollectionsListItem;