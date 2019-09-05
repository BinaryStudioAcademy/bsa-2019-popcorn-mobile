import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface IProps {
    navigation: any
}

const CollectionConstructor: React.FC<IProps> = ({ navigation }) => {
    return (
        <View>
            <Text>constructor</Text>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Text>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CollectionConstructor;