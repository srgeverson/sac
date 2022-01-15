import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Spinner } from 'reactstrap';
import { useSelector } from 'react-redux';

const UsuarioVisualizar = (props) => {
    const state = useSelector((state) => state.usuario);

    //Ao montar/entrar componente
    useEffect(() => {
        getUsuario(props.match.params.id);
        // eslint-disable-next-line
    }, []);

    //Ao desmontar/sair componente
    useEffect(() => {
        return props.limparUsuario();
        // eslint-disable-next-line
    }, []);

    const getUsuario = (id) => {
        props.getUsuario(id);
    }

    return (
        <>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Detalhes do Usuário</h2>
                </div>
                <Link to={"/usuarios"}>
                    <button className="btn btn-outline-success btn-sm">
                        Listar
                    </button>
                </Link>

                <Link to={`/usuarios-alterar/${props.match.params.id}`}>
                    <button className="ml-1 btn btn-outline-warning btn-sm">
                        Editar
                        </button>
                </Link>
            </div>
            <hr />
            {
                state.usuario ?
                    <dl className="row">
                        <dt className="col-sm-4">Código</dt>
                        <dd className="col-sm-8">{state.usuario._id}</dd>

                        <dt className="col-sm-4">Nome</dt>
                        <dd className="col-sm-8">{state.usuario.nome}</dd>

                        <dt className="col-sm-4">E-mail</dt>
                        <dd className="col-sm-8">{state.usuario.email}</dd>

                        <dt className="col-sm-4">Data do Cadastrado</dt>
                        <dd className="col-sm-8">{format(new Date(state.usuario.createdAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt })}</dd>

                        <dt className="col-sm-4">Última Alteração</dt>
                        <dd className="col-sm-8">{format(new Date(state.usuario.updatedAt), 'dd/MM/yyyy hh:mm:ss', { locale: pt })}</dd>

                        <dt className="col-sm-4">Status</dt>
                        <dd className="col-sm-8">{state.usuario.ativo ? "Ativo" : "Inativo"}</dd>
                    </dl>
                    :
                    <div className="d-flex justify-content-center"><Spinner color="info" /><span className="ml-1">Aguarde...</span></div>
            }
        </>
    );
}

export default UsuarioVisualizar;