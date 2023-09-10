# My Wallet - Backend

A versão demo para testes da API do DrivenPass pode acessada em https://my-wallet-rrtg.onrender.com

## Descrição

O backend do MyWallet é uma API REST desenvolvida para fornecer funcionalidades de gerenciamento de finanças pessoais, permitindo que os usuários registrem e recuperem transações financeiras. Ele é projetado para ser seguro e eficiente, fornecendo uma interface para a aplicação frontend acessar e interagir com o banco de dados MongoDB.

## Sobre

O backend do MyWallet segue uma arquitetura modular e organizada, com a separação de middlewares, routers, schemas e controllers. Utilizamos as seguintes principais tecnologias e funcionalidades:

- **MongoDB:** O banco de dados utilizado é o MongoDB, que oferece flexibilidade e escalabilidade para armazenar e gerenciar os dados das transações financeiras dos usuários.

- **Bcrypt:** Para garantir a segurança das senhas dos usuários, utilizamos o Bcrypt para criptografar as senhas antes de armazená-las no banco de dados.

- **Express:** O framework Express.js é usado para construir a infraestrutura da API REST, proporcionando um ambiente robusto para manipular requisições HTTP e definir rotas.

- **Joi:** Utilizamos o Joi para validação de dados, garantindo que as entradas dos usuários atendam aos requisitos necessários antes de serem processadas pela API.

### Endpoints

A API oferece os seguintes endpoints:

#### Autenticação
- `POST /api/auth/sign-up`: Rota para o registro de novos usuários.
- `POST /api/auth/sign-in`: Rota para o login de usuários existentes.
- `POST /api/auth/logout`: Rota para o logout de usuários autenticados.

#### Transações
- `POST /api/transactions/nova-transacao/:type`: Rota para registrar novas transações financeiras (entrada ou saída).
- `GET /api/transactions/transacoes`: Rota para recuperar a lista de transações financeiras dos usuários.

## Como Executar

Siga estas etapas para configurar e executar o backend do MyWallet:

1. Clone o repositório do backend em sua máquina local:

```bash
git clone https://github.com/kadioba/projeto14-mywallet-back
cd projeto14-mywallet-back
```

2. Crie um arquivo `.env` no diretório raiz do projeto e defina as seguintes variáveis de ambiente:

```dotenv
DATABASE_URL=mongodb://localhost:27017/mywallet
PORT=5000
```

3. Instale as dependências do projeto executando o seguinte comando:

```bash
npm install
```

4. Inicie o servidor do backend:

```bash
npm start
```

Agora, o backend estará em execução em `http://localhost:5000`, pronto para atender às solicitações da aplicação frontend.

Certifique-se de ter o Node.js e o npm instalados em sua máquina.

Sinta-se à vontade para explorar e integrar o backend com a aplicação frontend MyWallet! Se você encontrar algum problema ou tiver sugestões de melhoria, não hesite em relatar ou contribuir para o projeto.

Aproveite o uso do MyWallet! 🚀