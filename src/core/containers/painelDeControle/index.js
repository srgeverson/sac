import React from 'react';
import ContainerPainelDeControle from './ContainerPainelDeControle';
import { connect } from 'react-redux';
import * as actionsUsuario from '../../../domain/actions/actionsUsuario';


const containerPainelDeControle = Component => {
    class ComponenteContainerPainelDeControle extends React.Component {

        componentDidMount() {
            const { authorized, getPerfil, history } = this.props;
            getPerfil();
            if (!authorized) {
                return history.replace("/sac/");
            }
        }

        componentDidUpdate(nextProps) {
            const { authorized, history } = this.props;

            if (!nextProps.authorized || !authorized) {
                return history.replace("/sac/");
            }
        }

        render() {
            return (
                <ContainerPainelDeControle>
                    <Component {...this.props} />
                </ContainerPainelDeControle>
            );
        }
    }

    const mapStateToProps = state => ({
        authorized: state.usuario.authorized,
        usuario: state.usuario.usuarioLogado
    });

    return connect(mapStateToProps, actionsUsuario)(ComponenteContainerPainelDeControle);
}

export default containerPainelDeControle;