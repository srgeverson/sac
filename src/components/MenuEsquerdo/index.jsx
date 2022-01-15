
import React from 'react';
import { Link } from 'react-router-dom';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';

const MenuEsquerdo = ({ handleLogout, active }) => {
    return (
        <>
            <nav className={active ? "sidebar bg-secondary" : "sidebar bg-secondary toggled"}>
                <ul className="list-unstyled">
                    <li><Link to="/sac/painel-de-controle"><DashboardIcon /> Painel de Controle</Link></li>
                    <li><Link to="/sac/usuarios"><PeopleIcon /> Usuários</Link></li>
                    <li><Link to="#" onClick={() => handleLogout()}><MeetingRoomIcon /> Sair</Link></li>
                </ul>
            </nav>

        </>
    );
}

export default MenuEsquerdo;