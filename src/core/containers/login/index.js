import React from 'react';
import ContainerLogin from './ContainerLogin';
import { connect } from 'react-redux';
import * as actionsUsuario from '../../../domain/actions/actionsUsuario';
import { Redirect } from 'react-router';

const containerLogin = Component => {
    class ComponentContainerLogin extends React.Component {
        state = { erro: false }
        componentDidMount() {
            const { authorized, getPerfil } = this.props;
            getPerfil((err) => {
                this.setState({ erro: true })
            });
            if (authorized) return;
        }

        componentDidUpdate(nextProps) {
            const { history, authorized } = this.props;
            if (authorized) return history.replace("/sac/pagina-inicial");
        }

        render() {
            return (
                <>
                    {this.state.erro ? <Redirect to="/sac/pagina-inexistente" /> : ""}
                    <ContainerLogin>
                        <Component {...this.props} />
                    </ContainerLogin>
                </>
            );
        }
    }

    const mapStateToProps = state => ({
        authorized: state.usuario.authorized,
        usuario: state.usuario.usuarioLogado
    });

    return connect(mapStateToProps, actionsUsuario)(ComponentContainerLogin);
}

export default containerLogin;