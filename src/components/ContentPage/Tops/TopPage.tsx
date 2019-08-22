import React from 'react';
import { View, Text, Button } from 'react-native';

interface IProps {
    navigation: any
}

const TopPage: React.FC<IProps> = (props) => {
    return (
        <View>
            <Text>Top page</Text>
            <Button title="go back" onPress={() => { props.navigation.goBack() }} />
        </View>
    )
}

export default TopPage;