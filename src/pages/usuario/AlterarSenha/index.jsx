import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';

const UsuarioAlterarSenha = (props) => {
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [atencao, setAtencao] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const [aguardando, setAguardando] = useState(false);

    const criticas = () => {
        if (!senha) return setAtencao({ mensagem: "Preencha o campo senha!" });
        if (!confirmaSenha) return setAtencao({ mensagem: "Preencha o campo de confirmação de senha!" });
        if (senha !== confirmaSenha) return setAtencao({ mensagem: "As senhas não são iguais!" });
        if (senha.length < 6) return setAtencao({ mensagem: "A senha precisa ter pelo menos seis caracteres!" });
        return true;
    }

    const atualizarSenha = (e) => {
        e.preventDefault();
        if (!criticas()) return;
        setAguardando(true);
        props.alterarPerfil({ senha }, (retorno) => {
            if (retorno.erro.erro) {
                setErro({ mensagem: retorno.erro.mensagem });
            } else {
                setSucesso("Senha alterada com sucesso!");
                setFormularioSucesso(true);
            }
        });
    }

    if (formularioSucesso) {
        return <Redirect to={{
            pathname: '/perfil',
            state: { sucesso }
        }} />
    }

    return (
        <>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Alterar Senha</h2>
                </div>
                <Link to={"/perfil"}>
                    <button className="btn btn-outline-success btn-sm">
                        Voltar
                    </button>
                </Link>
            </div>
            <hr />
            <AlertaErro erro={erro} />
            <AlertaAtencao atencao={atencao} />
            <Form onSubmit={atualizarSenha}>
                <FormGroup>
                    <Label for="senha">Senha*</Label>
                    <Input
                        type="password"
                        value={senha}
                        name="senha"
                        id="senha"
                        className="form-control"
                        autoComplete="senha"
                        onChange={(ev) => setSenha(ev.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmaSenha">Confirme a senha*</Label>
                    <Input
                        type="password"
                        value={confirmaSenha}
                        name="confirmaSenha"
                        id="confirmaSenha"
                        className="form-control"
                        autoComplete="confirmaSenha"
                        onChange={(ev) => setConfirmaSenha(ev.target.value)}
                    />
                </FormGroup>
                <BotaoConfirmar aguardando={aguardando} />
            </Form>
        </>
    );
}

export default UsuarioAlterarSenha;