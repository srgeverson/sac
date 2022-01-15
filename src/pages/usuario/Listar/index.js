import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionsUsuario from '../../../domain/actions/actionsUsuario';
import { DropdownMenu, DropdownToggle, FormGroup, Input, Label, UncontrolledButtonDropdown } from 'reactstrap';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import AlertaErro from '../../../components/AlertaErro';
import AlertaSucesso from '../../../components/AlertaSucesso';
import BotaoAtivar from '../../../components/BotaoAtivar';
import BotaoCadastrar from '../../../components/BotaoCadastrar';
import BotaoDesativar from '../../../components/BotaoDesativar';
import BotaoEditar from '../../../components/BotaoEditar';
import BotaoExcluir from '../../../components/BotaoExcluir';
//import BotaoImprimir from '../../../components/BotaoImprimir';
import BotaoPesquisar from '../../../components/BotaoPesquisar';
import BotaoRelatorio from '../../../components/BotaoRelatorio';
import BotaoVisualizar from '../../../components/BotaoVisualizar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModalApagar from '../../../components/ModalApagar';
import ModalAtivar from '../../../components/ModalAtivar';
import ModalDesativar from '../../../components/ModalDesativar';
import ModalCarregando from '../../../components/ModalCarregando';

class Listar extends Component {

    state = {
        nome: '',
        email: '',
        dataInicial: format(new Date(), 'yyyy-MM-dd', { locale: pt }),
        dataFinal: format(new Date(), 'yyyy-MM-dd', { locale: pt }),
        mensagem: "",
        erro: "",
        aguardando: false,
        confirmarExclusao: false,
        idParaExcluir: null,
        confirmarAtivacao: false,
        idParaAtivar: null,
        confirmarDesativacao: false,
        idParaDesativar: null,
    }

    ajustaDataInicio = (dataOriginal) => {
        dataOriginal ? this.setState({ dataInicial: format(new Date(dataOriginal), 'yyyy-MM-dd', { locale: pt }) }) : this.setState({ dataInicial: "" });
    }

    ajustaDataFim = (dataOriginal) => {
        dataOriginal ? this.setState({ dataFinal: format(new Date(dataOriginal), 'yyyy-MM-dd', { locale: pt }) }) : this.setState({ dataFinal: "" });        
    }

    //Início rotina de exclusão
    abrirConfirmarExclusao(id) {
        this.setState({ confirmarExclusao: true });
        this.setState({ idParaExcluir: id });
    }

    fecharConfirmarExclusao() {
        this.setState({ confirmarExclusao: false })
    }

    apagarUsuario() {
        this.setState({ aguardando: true });
        this.props.removerUsuario(this.state.idParaExcluir, (retorno) => {
            if (retorno.erro.erro) {
                this.setState({ erro: retorno.erro.mensagem });
                this.setState({ aguardando: false });
            } else {
                this.setState({ mensagem: retorno.erro.mensagem });
                this.setState({ aguardando: false });
                this.fecharConfirmarExclusao();
                this.props.limparUsuarios();
                this.pesquisarUsuarios();
            }
        })
    }
    //Fim rotina de exclusão

    //Início rotina de ativação
    ativarUsuario() {
        this.setState({ aguardando: true });
        this.props.ativarUsuario({ id: this.state.idParaAtivar, ativo: true }, (retorno) => {
            if (retorno.erro.erro) {
                this.setState({ erro: retorno.erro.mensagem });
                this.setState({ aguardando: false });
            } else {
                this.setState({ mensagem: retorno.erro.mensagem });
                this.setState({ aguardando: false });
                this.fecharConfirmarAtivacao();
                this.props.limparUsuarios();
                this.pesquisarUsuarios();
            }
        });
    }

    abrirConfirmarAtivacao(id) {
        this.setState({ confirmarAtivacao: true });
        this.setState({ idParaAtivar: id });
    }

    fecharConfirmarAtivacao() {
        this.setState({ confirmarAtivacao: false })
    }
    //Fim rotina de ativação

    //Início rotina de desativação
    desativarUsuario() {
        this.setState({ aguardando: true });
        this.props.ativarUsuario({ id: this.state.idParaDesativar, ativo: false }, (retorno) => {
            if (retorno.erro.erro) {
                this.setState({ erro: retorno.erro.mensagem });
                this.setState({ aguardando: false });
            } else {
                this.setState({ mensagem: retorno.erro.mensagem });
                this.setState({ aguardando: false });
                this.fecharConfirmarDesativacao();
                this.pesquisarUsuarios();
                this.props.limparUsuarios();
            }
        });
    }

    abrirConfirmarDesativacao(id) {
        this.setState({ confirmarDesativacao: true });
        this.setState({ idParaDesativar: id });
    }

    fecharConfirmarDesativacao() {
        this.setState({ confirmarDesativacao: false })
    }
    //Fim rotina de desativação

    //Início da rotina de pesquisa
    pesquisarUsuarios(teste) {
        const { nome, email } = this.state;
        this.props.pesquisarUsuarios(nome, email);
        if (this.props.location.state) {
            this.setState({ mensagem: this.props.location.state.mensagem });
            //this.props.location.state.mensagem = "";
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }
    //Fim da rotina de pesquisa    

    componentDidMount() {
        this.pesquisarUsuarios();
    }

    componentDidUpdate(nextProps) {
        if (!this.props.usuariosPesquisados && nextProps.usuariosPesquisados) this.pesquisarUsuarios();
    }

    componentWillUnmount() {
        this.props.limparUsuarios();
        this.props.limparUsuario();
    }

    render() {
        const { nome, email, mensagem, erro, aguardando, confirmarExclusao, confirmarAtivacao, confirmarDesativacao } = this.state;

        var usuarios = [];
        if (this.props.usuariosPesquisados) usuarios = this.props.usuariosPesquisados;

        return (
            <>
                {/* Component modal apagar */}
                <ModalApagar isOpen={confirmarExclusao} toogle={() => this.fecharConfirmarExclusao()} apagar='Usuário' aguardando={aguardando} apagarObjeto={() => this.apagarUsuario()} />
                {/* Component modal ativar */}
                <ModalAtivar isOpen={confirmarAtivacao} toogle={() => this.fecharConfirmarAtivacao()} ativar='Usuário' aguardando={aguardando} ativarObjeto={() => this.ativarUsuario()} />
                {/* Component modal desativar */}
                <ModalDesativar isOpen={confirmarDesativacao} toogle={() => this.fecharConfirmarDesativacao()} desativar='Usuário' aguardando={aguardando} desativarObjeto={() => this.desativarUsuario()} />
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Usuários</h2>
                    </div>
                    {erro && <AlertaErro erro={{ mensagem: erro }} />}
                    {mensagem && <AlertaSucesso sucesso={{ mensagem: mensagem }} />}
                </div>
                <hr />
                <div className="form-group row">
                    <div className="col-sm-4">
                        <FormGroup>
                            <Label for="nome">Nome</Label>
                            <Input
                                type="text"
                                value={nome}
                                name="nome"
                                id="nome"
                                autoComplete="nome"
                                onChange={(ev) => this.onChangeInput("nome", ev)}
                                placeholder="Filtar pelo nome" />
                        </FormGroup>
                    </div>
                    <div className="col-sm-4">
                        <FormGroup>
                            <Label for="usuarioEmail">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                onChange={(ev) => this.onChangeInput("email", ev)}
                                type="email"
                                value={email}
                                autoComplete="email"
                                placeholder="Filtrar por email" />
                        </FormGroup>
                    </div>
                    <div className="col-sm-2">
                        <FormGroup>
                            <Label for="usuarioDataInicio">Início</Label>
                            <Input type="date" name="dataInicio" id="usuarioDataInicio" placeholder="Data inicial" value={this.state.dataInicial} onChange={(ev) => this.ajustaDataInicio(ev.target.value)} />
                        </FormGroup>
                    </div>
                    <div className="col-sm-2">
                        <FormGroup>
                            <Label for="usuarioDataFim">Fim</Label>
                            <Input type="date" name="dataFim" id="usuarioDataFim" placeholder="Data final" value={this.state.dataFinal} onChange={(ev) => this.ajustaDataFim(ev.target.value)} />
                        </FormGroup>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-2">
                        <FormGroup>
                            <BotaoPesquisar onClickPesquisar={() => {
                                this.props.limparUsuarios();
                                this.pesquisarUsuarios();
                            }} />
                        </FormGroup>
                    </div>
                    <div className="col-sm-2">
                        <FormGroup>
                            <BotaoCadastrar uri="/usuarios-cadastrar" descricaoObjeto='Usuario' />
                        </FormGroup>
                    </div>
                    <div className="col-sm-2">
                        <FormGroup>
                            <BotaoRelatorio />
                        </FormGroup>
                    </div>
                </div>
                <div className="table-responsive">
                    {!this.props.usuariosPesquisados && <ModalCarregando isOpen={true} pagina='Listagem de Usuários' />}
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th className="d-none d-sm-table-cell">Código</th>
                                <th>Nome</th>
                                <th className="d-none d-sm-table-cell">E-mail</th>
                                <th className="text-center">Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                usuarios.map(
                                    (usuario) => (
                                        <tr key={usuario._id} >
                                            <th className="d-none d-sm-table-cell">{usuario._id}</th>
                                            <th>{usuario.nome}</th>
                                            <td className="d-none d-sm-table-cell">{usuario.email}</td>
                                            <td className="text-center">
                                                <span className="d-none d-md-block">
                                                    <BotaoVisualizar uri={`/usuarios-visualizar/${usuario._id}`} />
                                                    {/* <BotaoImprimir onClick /> */}
                                                    <BotaoEditar uri={`/usuarios-alterar/${usuario._id}`} />
                                                    {usuario.ativo ? <BotaoDesativar onClick={() => this.abrirConfirmarDesativacao(usuario._id)} /> : <BotaoAtivar onClick={() => this.abrirConfirmarAtivacao(usuario._id)} />}
                                                    <BotaoExcluir onClick={() => this.abrirConfirmarExclusao(usuario._id)} />
                                                </span>
                                                <div className="dropdown d-block d-md-none">
                                                    <UncontrolledButtonDropdown>
                                                        <DropdownToggle outline size="sm">
                                                            <MoreVertIcon />
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <BotaoVisualizar uri={`/usuarios-visualizar/${usuario._id}`} />
                                                            {/* <BotaoImprimir onClick /> */}
                                                            <BotaoEditar uri={`/usuarios-alterar/${usuario._id}`} />
                                                            {usuario.ativo ? <BotaoDesativar onClick={() => this.abrirConfirmarDesativacao(usuario._id)} /> : <BotaoAtivar onClick={() => this.abrirConfirmarAtivacao(usuario._id)} />}
                                                            <BotaoExcluir onClick={() => this.abrirConfirmarExclusao(usuario._id)} />
                                                        </DropdownMenu>
                                                    </UncontrolledButtonDropdown>

                                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="acoesListar">

                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    //usuarios: state.usuario.usuarios,
    usuario: state.usuario.usuarioLogado,
    usuariosPesquisados: state.usuario.usuariosPesquisados,
})

export default connect(mapStateToProps, actionsUsuario)(Listar);