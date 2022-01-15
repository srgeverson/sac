# SAC - Serviço  de Atendimento ao Cliente
Este sistema servirá para acompanhar e gerenciar os atendimentos aos clientes.

#### 🧭 Baixando e rodando o projeto
```bash

# Clone este repositório
$ git clone https://srgeverson@github.com/sac.git

# Acesse a pasta do projeto no terminal/cmd
$ cd sac-web/arquivos_do_projeto

# Execute a API
$ java -jar sac-api-0.0.1.jar
# O servidor inciará na porta:8080 - acesse http://localhost:8080 

# Instale as dependências
$ npm install

# Execute a aplicação web
$ npm start

# O servidor inciará na porta:3000 - acesse http://localhost:3000 

```

## 🚀 Como o projeto foi iniciado

Este projeto é divido em três partes:
1. Backend (sac-web/arquivos_do_projeto) 
2. Frontend (sac-web)

💡Esta aplicação precisa que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [JDK 11](https://www.oracle.com/br/java/technologies/javase-jdk11-downloads.html). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o servidor (Backend)

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd sac-web/arquivos_do_projeto

# Execute a aplicação em modo de desenvolvimento
$ java -jar sac-api-0.0.1.jar

# O servidor inciará na porta:8080 - acesse http://localhost:8080 

```
#### 🎲 Rodando a aplicação web (Frontend)

```bash
#Instalar o react e o next [https://nextjs.org/docs/getting-started](https://nextjs.org/docs/getting-started).
$ npx create-react-app sac-web

#Instala o gerenciador de rotas.
$ npm install --save react-router-dom

#Instala o gerenciador de histórico de navegação.
$ npm install --save history

#Instalar o Bootstrap utilizando reactstrap: https://reactstrap.github.io/
$ npm install --save bootstrap
$ npm install --save reactstrap

#Redux compartilha estados entre componentes
$ npm install --save redux react-redux redux-thunk

#Realizar chamada para API
$ npm install --save axios

#Instalar a biblioteca de icones
$ npm install --save @material-ui/icons
$ npm install --save @material-ui/core

#Manipular datas
$ npm install --save date-fns

#validar o e-mail
$ npm install --save validator

#Gráficos do googgle

#Rodar o projeto
$ npm start

```

## 🛠️ Construído com

* [Visual Studio Code](https://code.visualstudio.com/) - IDE Visual Studio Code
* [React JS](https://pt-br.reactjs.org/) - React JS


## 👨‍💻 Equipe de Desenvolvimento

* **Geverson Souza** - [Geverson Souza](https://linkedin.com.br/)
## ✒️ Autores

* **Paulistense TI** - [ivitech](https://paulistense.com.br/)

## 📌 Versão ainda em produção

Nós usamos [Github](https://github.com/) para controle de versão.