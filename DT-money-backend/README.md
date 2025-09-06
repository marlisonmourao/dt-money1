# DT Money Backend

API REST para controle financeiro pessoal desenvolvida com Node.js, TypeScript e Fastify.

## 🚀 Sobre o Projeto

O DT Money Backend é uma API robusta que fornece endpoints para gerenciamento de usuários e transações financeiras. Desenvolvida seguindo princípios de Clean Architecture, oferece uma base sólida e escalável para aplicações de controle financeiro.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação tipada
- **Fastify** - Framework web rápido e eficiente
- **TypeORM** - ORM para TypeScript/JavaScript
- **SQLite** - Banco de dados local
- **PostgreSQL** - Banco de dados de produção
- **JWT** - Autenticação via tokens
- **Bcrypt** - Criptografia de senhas
- **Zod** - Validação de schemas
- **Swagger** - Documentação da API

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- PostgreSQL (para produção)

### Passos para instalação

1. Clone o repositório:
```bash
git clonehttps://github.com/marlisonmourao/dt-money1.git
cd DT-money-backend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Execute as migrações do banco de dados:
```bash
npm run migration:run
# ou
yarn migration:run
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## 🏗️ Arquitetura

O projeto segue os princípios da Clean Architecture, organizando o código em camadas bem definidas:

```
src/
├── domain/               # Regras de negócio
│   ├── transaction/      # Entidades e casos de uso de transações
│   └── user/            # Entidades e casos de uso de usuários
├── infra/               # Infraestrutura
│   ├── database/        # Configuração do banco de dados
│   └── web/            # Configuração da API web
├── interfaces/          # Interfaces compartilhadas
└── shared/             # Código compartilhado
    └── errors/         # Classes de erro customizadas
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm start` - Inicia o servidor em modo produção
- `npm run migration:run` - Executa as migrações do banco
- `npm run migration:revert` - Reverte a última migração

## 📚 Documentação da API

A documentação da API está disponível através do Swagger UI. Após iniciar o servidor, acesse:

```
http://localhost:3001/documentation
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos, inclua o token no header:

```
Authorization: Bearer <seu-token>
```

## 📊 Endpoints Principais

### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Registro de usuário

### Transações
- `GET /transactions` - Listar transações
- `POST /transactions` - Criar transação
- `PUT /transactions/:id` - Atualizar transação
- `DELETE /transactions/:id` - Excluir transação
- `GET /transactions/data` - Obter dados das transações

## 🗄️ Banco de Dados

### SQLite (Desenvolvimento)
O banco SQLite é usado para desenvolvimento local e está localizado em:
```
src/infra/database/typeorm/dt-money/database.sqlite
```

### PostgreSQL (Produção)
Para produção, configure a conexão com PostgreSQL através das variáveis de ambiente.

## 🔒 Segurança

- Senhas são criptografadas usando bcrypt
- Tokens JWT com expiração configurável
- Validação de entrada com Zod
- CORS configurado para segurança
- Tratamento de erros padronizado

## 🧪 Testes

```bash
npm test
# ou
yarn test
```

## 📈 Monitoramento

O servidor roda na porta 3001 por padrão. Logs são exibidos no console durante o desenvolvimento.

## 🚀 Deploy

### Variáveis de Ambiente Necessárias

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dt_money
JWT_SECRET=sua-chave-secreta-jwt
NODE_ENV=production
```

### Docker (Opcional)

```bash
# Build da imagem
docker build -t dt-money-backend .

# Executar container
docker run -p 3001:3001 dt-money-backend
```

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato através do email ou abra uma issue no repositório.