import React from 'react';
import { SafeAreaView } from 'react-native';
import estilosComum from '../assets/estilos/estilosComum';
import Atendimento from './atendimento/Atendimento';
import EstatisticasUsuario from './usuario/EstatisticasUsuario';
import InfoUsuario from './usuario/InfoUsuario';

export default props => {
    return (
        <SafeAreaView style={[estilosComum.viewPadrao]}>
            <Atendimento />
            <EstatisticasUsuario />
            <InfoUsuario />
        </SafeAreaView>
    );
};
