/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Atendimento from '../view/atendimento/Atendimento';
import InfoUsuario from '../view/usuario/InfoUsuario';
import EstatisticasUsuario from '../view/usuario/EstatisticasUsuario';
import Ionicons from 'react-native-vector-icons/Ionicons';
import estilosComum from '../assets/estilos/estilosComum';

const Tab = createBottomTabNavigator();

export default (props) => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        switch (route.name) {
          case 'InfoUsuario':
            iconName = focused
              ? 'person-circle'
              : 'person-circle-outline';
            break;
          case 'Atendimento':
            iconName = focused
              ? 'construct-outline'
              : 'ios-construct-outline';
            break;
          case 'EstatisticasUsuario':
            iconName = focused 
            ? 'ios-bar-chart' 
            : 'ios-bar-chart-outline';
            break;
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: estilosComum.cores.principal,
      inactiveTintColor: estilosComum.cores.padrao,
      showLabel: true,
      labelStyle: {fontSize: 15},
    }}
    initialRouteName="Atendimento">
    <Tab.Screen
      options={{title: 'Usuário'}}
      name="InfoUsuario"
      component={InfoUsuario}
    />
    <Tab.Screen
      options={{title: 'Atendimento'}}
      name="Atendimento"
      component={Atendimento}
    />
    <Tab.Screen
      options={{title: 'Estatísticas'}}
      name="EstatisticasUsuario"
      component={EstatisticasUsuario}
    />
  </Tab.Navigator>
);
