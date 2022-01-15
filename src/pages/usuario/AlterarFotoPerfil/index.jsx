import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import BotaoConfirmar from '../../../components/BotaoConfirmar';
import AlertaErro from '../../../components/AlertaErro';
import AlertaAtencao from '../../../components/AlertaAtencao';

const AlterarFotoPerfil = (props) => {
    const [foto, setFoto] = useState(null);
    const [atencao, setAtencao] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [formularioSucesso, setFormularioSucesso] = useState(false);
    const [aguardando, setAguardando] = useState(false);

    const atualizarFoto = async () => {
        setAtencao("");
        setErro("");
        setSucesso("");
        if (!criticas()) return;
        setAguardando(true);
        const formData = new FormData();
        formData.append('foto', foto);
        await props.alterarFotoPerfil(formData, (retorno) => {
            if (retorno.erro.erro) {
                setAtencao("");
                setSucesso("");
                setErro({ mensagem: retorno.erro.mensagem });
            } else {
                setAtencao("");
                setErro("");
                setSucesso("Foto do perfil alterada com sucesso!");
                setFormularioSucesso(true);
            }
            setAguardando(false);
        });
    }

    const criticas = () => {
        if (!foto) return setAtencao({ mensagem: "Escolha uma foto!" });
        return true;
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
                    <h2 className="display-4 titulo">Alterar Foto Perfil</h2>
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
                <FormGroup>
                    <Label for="foto">Foto*</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        name="foto"
                        id="foto"
                        className="form-control"
                        autoComplete="foto"
                        onChange={(ev) => setFoto(ev.target.files[0])}
                    />
                </FormGroup>
                <FormGroup>
                    {foto ? <img src={URL.createObjectURL(foto)} className="rounded-circle" width="150" height="150" alt="Foto Perfil" /> : ""}
                </FormGroup>
                <br />
                <Link onClick={() => atualizarFoto()} to="#">
                    <BotaoConfirmar aguardando={aguardando} />
                </Link>
            </Form>
        </>
    );
}

export default AlterarFotoPerfil;