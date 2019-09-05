import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface IProps {
    navigation: any
}

const Collection: React.FC<IProps> = ({ navigation }) => {
    return (
        <View>
            <Text>{navigation.state.params.id}</Text>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Text>Go back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Collection;