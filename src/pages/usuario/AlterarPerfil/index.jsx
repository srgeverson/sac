// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';
import { useSelector } from 'react-redux';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';

const UsuarioAltearPerfil = (props) => {
    const { usuario } = useSelector((state) => state);

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [atencao, setAtencao] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const [aguardando, setAguardando] = useState(false);

    const receberDadosApi = () => {
        if (usuario.usuarioLogado) {
            setId(usuario.usuarioLogado._id);
            setNome(usuario.usuarioLogado.nome);
            setEmail(usuario.usuarioLogado.email);
        }
    }

    const criticas = () => {
        if (!nome) return setAtencao({ mensagem: "Preencha o campo nome!" });
        if (!email) return setAtencao({ mensagem: "Preencha o campo e-mail!" });
        if (!validator.isEmail(email)) return setAtencao({ mensagem: "Preencha com e-mail válido!" });
        return true;
    }

    const atualizarPerfil = () => {
        if (!criticas()) return;
        setAguardando(true);
        props.alterarPerfil({ nome, email }, (retorno) => {
            if (retorno.erro.error) {
                setErro({ mensagem: retorno.erro.mensagem });
            } else {
                setSucesso("Perfil editado com sucesso!");
                recarregaPerfil();
            }
        });
    }

    const recarregaPerfil = async () => {
        await props.recarregaPerfil(() => {
            setErro({ erro: "" });
            setFormularioSucesso(true);
            setAguardando(false);
        })
    }

    //Ao renderizar componente
    useEffect(() => {
        receberDadosApi();
        // eslint-disable-next-line
    }, []);

    //Ao atualizar componente
    useEffect(() => {
        receberDadosApi();
        // eslint-disable-next-line
    }, [usuario.usuarioLogado]);

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
                    <h2 className="display-4 titulo">Alterar Perfil</h2>
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
            <Form>
                <Input type="hidden"
                    value={id}
                    name="id"
                    id="id" />
                <FormGroup>
                    <Label for="nome">Nome*</Label>
                    <Input
                        type="text"
                        value={nome}
                        name="nome"
                        id="nome"
                        className="form-control"
                        autoComplete="nome"
                        onChange={(ev) => setNome(ev.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">E-mail*</Label>
                    <Input
                        type="email"
                        value={email}
                        name="email"
                        id="email"
                        className="form-control"
                        autoComplete="email"
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                </FormGroup>
                <Link onClick={() => atualizarPerfil()} to="#">
                    <BotaoConfirmar aguardando={aguardando} />
                </Link>
            </Form>
        </>
    );
}

export default UsuarioAltearPerfil;