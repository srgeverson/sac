import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AlertaSucesso from '../../../components/AlertaSucesso';
import '../../../assets/styles/perfil/index.css';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const Perfil = (props) => {
    const { usuario } = useSelector((state) => state);
    const [primeiroNome, setPrimeiroNome] = useState("");
    const [sucesso, setSucesso] = useState("");

    //Ao renderizar componente
    useEffect(() => {
        const { location } = props;
        var primeiroNome = "Usuário";

        if (usuario.usuarioLogado) {
            if (usuario.usuarioLogado.nome) {
                [primeiroNome] = usuario.usuarioLogado.nome.split(' ');
            }
        }
        setPrimeiroNome({ primeiroNome: primeiroNome });

        if (location.state) {
            setSucesso(location.state.sucesso);
        }
        // eslint-disable-next-line
    }, []);

    if (usuario.usuarioLogado) {
        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Perfil</h2>
                    </div>
                    <Link to="/sac/usuarios-alterar-perfil">
                        <button className="btn btn-outline-warning ml-1 btn-sm">Alterar Perfil</button>
                    </Link>
                    <Link to="/sac/usuarios-alterar-senha">
                        <button className="btn btn-outline-danger ml-1 btn-sm">Alterar Senha</button>
                    </Link>
                </div><hr />
                {sucesso && <AlertaSucesso sucesso={{ mensagem: sucesso }} />}
                <dl className="row">
                    <dt className="col-sm-3">Imagem</dt>
                    <dd className="col-sm-9">
                        <div className="img-perfil">
                            <img className="rounded-circle" src={usuario.usuarioLogado.url} alt={primeiroNome} width="100" height="100" />
                            <div className="edit">
                                <Link to={"/usuarios-alterar-foto"}>
                                    <button className="btn btn-outline-light btn-sm">
                                        <PhotoCameraIcon />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </dd>

                    <dt className="col-sm-3">Nome</dt>
                    <dd className="col-sm-9">{usuario.usuarioLogado.nome}</dd>

                    <dt className="col-sm-3">E-mail</dt>
                    <dd className="col-sm-9">{usuario.usuarioLogado.email}</dd>
                </dl>
            </>
        )
    }
    return null;
}

export default Perfil;