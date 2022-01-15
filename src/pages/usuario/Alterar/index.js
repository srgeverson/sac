import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionsUsuario from '../../../domain/actions/actionsUsuario';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import validator from 'validator';
import AlertaErro from '../../../components/AlertaErro';

class UsuarioAlterar extends Component {

    state = {
        _id: "",
        email: "",
        nome: "",
        ativo: false,
        erro: "",
        aguardando: false,
        dadosUsuario: false,
        formularioPronto: false
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getUsuario(id);
    }

    async componentDidUpdate(nextProps) {
        const { id } = this.props.match.params;
        if (!this.props.usuario && nextProps.usuario) this.props.getUsuario(id);
        await this.receberDadosUsuario();
    }

    receberDadosUsuario() {
        const { id } = this.props.match.params;
        if (typeof this.props.usuario !== "undefined" && this.props.usuario !== null && this.props.usuario._id === id && !this.state.dadosUsuario) {
            this.setState({ _id: this.props.usuario._id });
            this.setState({ nome: this.props.usuario.nome });
            this.setState({ email: this.props.usuario.email });
            this.setState({ ativo: this.props.usuario.ativo });
            this.setState({ dadosUsuario: true });
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async alterarUsuario() {
        this.setState({ erro: "" });

        await this.receberDadosFormulario();

        if (!this.criticas()) return;

        this.setState({ aguardando: true });

        const { _id, nome, email, ativo } = this.state;

        this.props.alterarUsuario({ _id, nome, email, ativo }, (err) => {
            if (err.erro.erro) {
                this.setState({ erro: { mensagem: err.erro.mensagem } });
                this.setState({ aguardando: false });
            } else {
                this.setState({ aguardando: false });
                this.setState({ formularioPronto: true });
            }
        })
    }

    receberDadosFormulario() {
        this.setState({ _id: document.querySelector("#_id").value });
        this.setState({ nome: document.querySelector("#nome").value });
        this.setState({ email: document.querySelector("#email").value });
        this.setState({ ativo: document.querySelector("#ativo").value });
    }

    criticas() {
        const { nome, email } = this.state;
        if (!nome) return this.setState({ erro: { mensagem: "Preencha o campo nome!" } });
        if (!email) return this.setState({ erro: { mensagem: "Preencha o campo e-mail!" } });
        if (!validator.isEmail(email)) return this.setState({ erro: { mensagem: "Preencha com e-mail válido!" } });
        return true;
    }

    render() {
        const { _id, nome, email, ativo, aguardando, erro, dadosUsuario, formularioPronto } = this.state;

        if (formularioPronto) {
            return <Redirect to={{
                pathname: '/usuarios',
                state: { mensagem: 'Usuário alterado com sucesso!' }
            }} />
        }

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Alterar Usuário</h2>
                    </div>
                    <Link to={"/usuarios"}>
                        <button className="btn btn-outline-success btn-sm">
                            Listar
                        </button>
                    </Link>

                    <Link to={"/usuarios-visualizar/" + this.props.match.params.id}>
                        <button className="ml-1 btn btn-outline-info btn-sm">
                            Visualisar
                        </button>
                    </Link>
                </div>
                <hr />
                <AlertaErro erro={erro} />
                <Form>
                    <Input type="hidden"
                        value={_id}
                        name="_id"
                        id="_id" />
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input
                            type="text"
                            value={nome}
                            name="nome"
                            id="nome"
                            className="form-control"
                            placeholder={dadosUsuario ? "Nome do usuário" : "Carregado..."}
                            disabled={dadosUsuario ? false : true}
                            autoComplete="nome"
                            onChange={(ev) => this.onChangeInput("nome", ev)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input
                            type="email"
                            value={email}
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder={dadosUsuario ? "E-mail do usuário" : "Carregando.."}
                            disabled={dadosUsuario ? false : true}
                            autoComplete="email"
                            onChange={(ev) => this.onChangeInput("email", ev)}
                        />
                    </FormGroup>
                    <FormGroup check inline>
                        <Label for="ativo" check>
                            <Input
                                type="checkbox"
                                checked={ativo ? true : false}
                                value={ativo}
                                name="ativo"
                                id="ativo"
                                disabled={dadosUsuario ? false : true}
                                autoComplete="ativo"
                                onClick={() => (ativo ? this.setState({ ativo: false }) : this.setState({ ativo: true }))}
                            /> Ativo
                        </Label>
                    </FormGroup>
                    <br /><br />
                    <Link onClick={() => this.alterarUsuario()} to="#">
                        <BotaoConfirmar aguardando={aguardando} />
                    </Link>
                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.usuario.usuario
})

export default connect(mapStateToProps, actionsUsuario)(UsuarioAlterar);