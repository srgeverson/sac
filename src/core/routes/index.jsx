import React from 'react';
import { BrowserRouter, Switch, Route, Router, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { history } from '../history';
//Containers
import containerLogin from '../containers/login';
import painelDeControle from '../containers/painelDeControle';
//Páginas
import CriarConta from '../../pages/usuario/CriarConta';
import Login from '../../pages/usuario/Login';
import Perfil from '../../pages/usuario/Perfil';
import PainelDeControle from '../../pages/PainelDeControle';
import PaginaInexistente from '../../pages/PaginaInexistente';
import PaginaInicial from '../../pages/PaginaInicial';
import RecuperarSenha from '../../pages/usuario/RecuperarSenha';
import UsuarioAlterar from '../../pages/usuario/Alterar';
import UsuarioAlterarPerfil from '../../pages/usuario/AlterarPerfil';
import UsuarioAlterarFotoPerfil from '../../pages/usuario/AlterarFotoPerfil';
import UsuarioAlterarSenha from '../../pages/usuario/AlterarSenha';
import UsuarioCadastrar from '../../pages/usuario/Cadastrar';
import UsuarioNovaSenha from '../../pages/usuario/NovaSenha';
import UsuarioVisualizar from '../../pages/usuario/Visualizar';
import UsuariosListar from '../../pages/usuario/Listar';

const Routes = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <BrowserRouter>
                    <Switch>
                        {/* Páginas sem autenticação */}
                        <Route path="/sac/" exact component={containerLogin(Login)} />
                        <Route path="/sac/recuperar-senha" exact component={containerLogin(RecuperarSenha)} />
                        <Route path="/sac/criar-conta" exact component={containerLogin(CriarConta)} />
                        <Route path="/sac/nova-senha/:recuperarSenha" exact component={containerLogin(UsuarioNovaSenha)} />
                        {/* Páginas com autenticação */}
                        <Route path="/sac/painel-de-controle" exact component={painelDeControle(PainelDeControle)} />
                        <Route path="/sac/pagina-inicial" exact component={painelDeControle(PaginaInicial)} />
                        <Route path="/sac/perfil" exact component={painelDeControle(Perfil)} />
                        <Route path="/sac/usuarios" exact component={painelDeControle(UsuariosListar)} />
                        <Route path="/sac/usuarios-alterar/:id" exact component={painelDeControle(UsuarioAlterar)} />
                        <Route path="/sac/usuarios-alterar-perfil" exact component={painelDeControle(UsuarioAlterarPerfil)} />
                        <Route path="/sac/usuarios-alterar-foto" exact component={painelDeControle(UsuarioAlterarFotoPerfil)} />
                        <Route path="/sac/usuarios-alterar-senha" exact component={painelDeControle(UsuarioAlterarSenha)} />
                        <Route path="/sac/usuarios-cadastrar" exact component={painelDeControle(UsuarioCadastrar)} />
                        <Route path="/sac/usuarios-visualizar/:id" exact component={painelDeControle(UsuarioVisualizar)} />
                        <Route path="/sac/pagina-inexistente" exact component={PaginaInexistente} />
                        <Redirect from="*" to="/sac/pagina-inexistente" />
                    </Switch>
                </BrowserRouter>
            </Router>
        </Provider>
    );
}

export default Routes;