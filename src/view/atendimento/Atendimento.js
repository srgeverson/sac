/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import { Card, Input, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => (
    <View>
        <Card>
            <Card.Title>Atendimentos..</Card.Title>
            <Card.Divider />
            <SearchBar placeholder='Cliente'/>
        </Card>
    </View>
);
