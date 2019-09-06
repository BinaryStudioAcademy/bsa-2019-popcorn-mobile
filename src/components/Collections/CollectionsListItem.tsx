import React from 'react';
import { IMovieListPreview } from './ICollection';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

interface IProps {
    preview: IMovieListPreview;
    navigation: any;
    deleteCollection: ({ movieListId: string }) => void;
    isOwner: () => boolean
}

const CollectionsListItem: React.FC<IProps> = ({ preview, navigation, deleteCollection,isOwner }) => {
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Collection', { id: preview.id }) }}>
            <Text>{preview.title}</Text>
            {   
                isOwner() &&
                <TouchableWithoutFeedback>
                    <TouchableOpacity onPress={() => { deleteCollection({ movieListId: preview.id }) }}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </TouchableWithoutFeedback>
            }
        </TouchableOpacity>
    )
}

export default CollectionsListItem;