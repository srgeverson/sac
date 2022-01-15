import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const PaginaInicial = () => {
    return (
        <>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Seja bem vindo!</h2>
                </div>
            </div>
            <hr />
            <Jumbotron>
                <p className="lead">Este sistema servirá para gerenciar os atendimentos dos clientes.</p>

                <p className="lead">
                    <Button color="secondary">Saiba mais...</Button>
                </p>
            </Jumbotron>

        </>
    );
}

export default PaginaInicial;