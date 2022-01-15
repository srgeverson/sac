export const salvarToken = (usuario) => {
    if (!usuario.token) return null;
    const [token1, token2, token3] = usuario.token.split('.');
    localStorage.setItem("valueTk1", token1);
    localStorage.setItem("valueTk2", token2);
    localStorage.setItem("valueTk3", token3);
}

export const removerToken = () => {
    localStorage.removeItem("valueTk1");
    localStorage.removeItem("valueTk2");
    localStorage.removeItem("valueTk3");
}

export const buscarToken = () => {
    const token1 = localStorage.getItem("valueTk1");
    const token2 = localStorage.getItem("valueTk2");
    const token3 = localStorage.getItem("valueTk3");
    if (!token1 || !token2 || !token3) {
        return null;
    } else {
        return `${token1}.${token2}.${token3}`;
    }
}

export const headers = () => {
    return {
        'headers': {
            'Authorization': `Bearer ${buscarToken()}`
        }
    }
}