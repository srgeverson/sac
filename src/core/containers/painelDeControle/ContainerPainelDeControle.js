import React from 'react';
import BarraDeFerramentas from '../../../components/BarraDeFerramentas';
import MenuEsquerdo from '../../../components/MenuEsquerdo';
import '../../../assets/styles/painelDeControle/index.css';
import { connect } from 'react-redux';
import * as  actionsUsuario from '../../../domain/actions/actionsUsuario';


class ContainerPainelDeControle extends React.Component {

    state = { menuAberto: true }

    alternarMenu() {
        this.setState({ menuAberto: !this.state.menuAberto });
    }

    render() {
        return (
            <>
                <BarraDeFerramentas handleLogout={this.props.handleLogout} dadosUsuario={this.props} alternarMenu={() => this.alternarMenu()} />
                <div className="d-flex">
                    <MenuEsquerdo handleLogout={this.props.handleLogout} active={this.state.menuAberto} />
                    <div className="content p-1">
                        <div className="list-group-item">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default connect(null, actionsUsuario)(ContainerPainelDeControle);