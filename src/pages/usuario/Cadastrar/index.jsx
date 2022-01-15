import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';
import { connect } from 'react-redux';
import * as actionsUsuario from '../../../domain/actions/actionsUsuario';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import AlertaErro from "../../../components/AlertaErro";
import AlertaAtencao from "../../../components/AlertaAtencao";
import BotaoConfirmar from '../../../components/BotaoConfirmar';

const UsuarioCadastrar = (props) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [ativo, setAtivo] = useState(true);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [atencao, setAtencao] = useState("");
    const [aguardando, setAguardando] = useState(false);
    const [formularioPronto, setFormularioPronto] = useState(false);

    const cadastrarUsuario = () => {
        if (!criticas()) return;

        setAguardando(true);

        props.salvarUsuario({ nome, email, senha, ativo }, (retorno) => {
            if (retorno.erro.erro) {
                setAtencao("");
                setSucesso("");
                setErro({ erro: { mensagem: retorno.erro.mensagem } });
                setAguardando(false);
            } else {
                setAtencao("");
                setErro("");
                setSucesso("Usuário cadastrado com sucesso!");
                setFormularioPronto(true);
                setAguardando(false);
            }
        })
    }

    const criticas = () => {
        if (!nome) return setAtencao({ mensagem: "Preencha o campo nome!" });
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        if (!validator.isEmail(email)) return setAtencao({ mensagem: "Preencha com e-mail válido!" });
        if (!senha) return setAtencao({ mensagem: "Preencha o campo senha!" });
        if (senha.length < 6) return setAtencao({ mensagem: "A senha precisa ter pelo menos seis caracteres!" });
        return true;
    }


    if (formularioPronto) {
        return <Redirect to={{
            pathname: '/usuarios',
            state: { mensagem: sucesso }
        }} />
    }

    return (
        <>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Cadastrar Usuário</h2>
                </div>
                <Link to={"usuarios"}>
                    <button className="btn btn-outline-success btn-sm">
                        Listar
                    </button>
                </Link>
            </div>
            <hr />
            <AlertaErro erro={erro} />
            <AlertaAtencao atencao={atencao} />
            <Form>
                <FormGroup>
                    <Label for="name">Nome</Label>
                    <Input
                        type="text"
                        value={nome}
                        name="nome"
                        id="nome"
                        placeholder="Nome completo do usuário"
                        autoComplete="nome"
                        onChange={(ev) => setNome(ev.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">E-mail</Label>
                    <Input
                        type="email"
                        value={email}
                        name="email"
                        id="email"
                        placeholder="Melhor e-mail do usuário"
                        autoComplete="email"
                        onChange={(ev) => setEmail(ev.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="senha">Senha</Label>
                    <Input
                        type="password"
                        value={senha}
                        name="senha"
                        id="senha"
                        placeholder="A senha deve ter de 6 a 12 caracteres"
                        autoComplete="senha"
                        onChange={(ev) => setSenha(ev.target.value)} />
                </FormGroup>
                <FormGroup check inline>
                    <Label check>
                        <Input
                            type="checkbox"
                            checked={ativo}
                            value={ativo}
                            name="ativo"
                            id="ativo"
                            autoComplete="ativo"
                            onChange={() => (ativo ? setAtivo(false) : setAtivo(true))} /> Ativo
                        </Label>
                </FormGroup>
                <br /><br />
                <Link onClick={() => cadastrarUsuario()} to="#">
                    <BotaoConfirmar aguardando={aguardando} />
                </Link>
            </Form>
        </>
    )
}

export default connect(null, actionsUsuario)(UsuarioCadastrar);