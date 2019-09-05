import React from 'react';
import { IMovieListPreview } from './ICollection';
import { View, Text, TouchableOpacity } from 'react-native';

interface IProps {
    preview: IMovieListPreview;
    navigation: any;
}

const CollectionsListItem: React.FC<IProps> = ({ preview, navigation }) => {
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Collection', { id: preview.id }) }}>
            <Text>{preview.title}</Text>
        </TouchableOpacity>
    )
}

export default CollectionsListItem;