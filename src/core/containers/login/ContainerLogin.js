import React from 'react';
import '../../../assets/styles/login/index.css';

class ContainerLogin extends React.Component {
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export default ContainerLogin;