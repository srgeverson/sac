import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Operacional from './Operacional';

export default props => (
    <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
            <Operacional />
        </NavigationContainer>
    </SafeAreaView>
)