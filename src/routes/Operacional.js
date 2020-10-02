import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/Ionicons';
import Atendimento from '../view/atendimento/Atendimento';
import InfoUsuario from '../view/usuario/InfoUsuario';
import EstatisticasUsuario from '../view/usuario/EstatisticasUsuario';

const Tab = createBottomTabNavigator();

export default props => (
    <Tab.Navigator
        // screenOptions={({ route }) => ({
        //     tabBarIcon: ({ focused, color, size }) => {
        //         let iconName;
        //         switch (route.name) {
        //             case 'InfoUsuario':
        //                 iconName = focused
        //                     ? 'ios-information-circle'
        //                     : 'ios-information-circle-outline';
        //                 break;
        //             case 'Atendimento':
        //                 iconName = focused
        //                     ? 'ios-information-circle'
        //                     : 'ios-information-circle-outline';
        //                 break;
        //             case 'EstatisticasUsuario':
        //                 iconName = focused
        //                     ? 'list'
        //                     : 'ios-list';
        //                 break;
        //         }
        //         return <Ionicons name={iconName} size={size} color={color} />;
        //     },
        // })}
        tabBarOptions={{
            activeTintColor: 'red',
            inactiveTintColor: 'blue',
            showLabel: true,
            labelStyle: { fontSize: 15 }
        }}
        initialRouteName='Atendimento'>
        <Tab.Screen options={{ title: 'Inicial' }} name='InfoUsuario' component={InfoUsuario} />
        <Tab.Screen options={{ title: 'Meio' }} name='Atendimento' component={Atendimento} />
        <Tab.Screen options={{ title: 'Final' }} name='EstatisticasUsuario' component={EstatisticasUsuario} />
    </Tab.Navigator>
)