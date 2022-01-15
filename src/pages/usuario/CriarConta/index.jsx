import React, { useState } from 'react';
import logo_sistema from '../../../assets/images/logo_sistema.png';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import { Form, InputGroup, InputGroupAddon, InputGroupText, FormGroup, Input } from 'reactstrap';
import validator from 'validator';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const CriarConta = (props) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const ativo = true;
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [atencao, setAtencao] = useState("");
    const [aguardando, setAguardando] = useState(false);
    const [formularioPronto, setFormularioPronto] = useState(false);

    const criticas = () => {
        if (!nome) return setAtencao({ mensagem: "Preencha o campo nome!" });
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        if (!validator.isEmail(email)) return setAtencao({ mensagem: "Preencha com e-mail válido!" });
        if (!senha) return setAtencao({ mensagem: "Preencha o campo senha!" });
        if (senha.length < 6) return setAtencao({ mensagem: "A senha precisa ter pelo menos seis caracteres!" });
        return true;
    }

    const criarConta = (e) => {
        e.preventDefault();
        if (!criticas()) return;
        setAguardando(true);
        props.criarConta({ nome, email, senha, ativo }, (retorno) => {
            if (retorno.erro.erro) {
                setAtencao("");
                setSucesso("");
                setErro({ mensagem: retorno.erro.mensagem });
                setAguardando(false);
            } else {
                setAtencao("");
                setErro("");
                setSucesso({ mensagem: "Conta criada com sucesso!" });
                setFormularioPronto(true);
                setAguardando(false);
            }
        })
    }

    if (formularioPronto) {
        return <Redirect to={{
            pathname: '/',
            state: { sucesso }
        }} />
    }

    return (
        <div className="container-login">
            <div className="login card shadow">
                <Form onSubmit={criarConta} className="form-signin text-center">
                    <img className="mb-4" src={logo_sistema} alt="SAC" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Criar Conta</h1>
                    <AlertaErro erro={erro} />
                    <AlertaAtencao atencao={atencao} />
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Nome*</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="nome"
                                value={nome}
                                name="nome"
                                id="nome"
                                placeholder="Digite seu nome..."
                                onChange={(ev) => setNome(ev.target.value)} required />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>E-mail*</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="email"
                                value={email}
                                name="email"
                                id="email"
                                placeholder="Digite seu email..."
                                onChange={(ev) => setEmail(ev.target.value)} required />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" style={{ height: 46 }}>
                                <InputGroupText>Senha*</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="password"
                                value={senha}
                                name="senha"
                                id="senha"
                                placeholder="Digite sua senha no mínimo 6 caracteres..."
                                onChange={(ev) => setSenha(ev.target.value)} required />
                        </InputGroup>
                    </FormGroup>
                    <BotaoConfirmar aguardando={aguardando} />
                    <br />
                    <Link to="/sac/">Login</Link>
                </Form>
            </div>
        </div>
    );
}

export default CriarConta;