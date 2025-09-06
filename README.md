# DT Money - Sistema de Controle Financeiro

Um sistema completo de controle financeiro pessoal composto por aplicativo mobile e API backend.

## 📱 Sobre o Projeto

O DT Money é uma solução completa para gerenciamento financeiro pessoal, oferecendo uma experiência mobile intuitiva e uma API robusta para suporte. O sistema permite aos usuários controlar receitas, despesas, categorizar transações e visualizar resumos financeiros detalhados.

## 🏗️ Arquitetura do Sistema

```
dt-money/
├── dt-money-app/          # Aplicativo Mobile (React Native + Expo)
└── DT-money-backend/      # API Backend (Node.js + TypeScript + Fastify)
```

### Frontend (Mobile App)
- **Tecnologia**: React Native com Expo
- **Linguagem**: TypeScript
- **Estilização**: NativeWind (Tailwind CSS para React Native)
- **Estado**: React Context API
- **Navegação**: Expo Router
- **Validação**: Zod + React Hook Form

### Backend (API)
- **Tecnologia**: Node.js com Fastify
- **Linguagem**: TypeScript
- **Banco de Dados**: SQLite (dev) / PostgreSQL (prod)
- **ORM**: TypeORM
- **Autenticação**: JWT
- **Documentação**: Swagger/OpenAPI
- **Arquitetura**: Clean Architecture

## 🚀 Início Rápido

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)
- PostgreSQL (para produção)

### Instalação Completa

1. **Clone o repositório:**
```bash
git clone https://github.com/marlisonmourao/dt-money1.git
cd dt-money
```

2. **Configure o Backend:**
```bash
cd DT-money-backend
npm install
cp .env.example .env
# Configure as variáveis de ambiente
npm run migration:run
npm run dev
```

3. **Configure o Frontend:**
```bash
cd ../dt-money-app
npm install
npm start
```

4. **Execute no dispositivo:**
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 📱 Funcionalidades Principais

### Aplicativo Mobile
- ✅ **Autenticação**: Login e registro de usuários
- ✅ **Transações**: Criação, edição e exclusão de transações
- ✅ **Categorização**: Organização por categorias de receitas e despesas
- ✅ **Filtros Avançados**: Filtros por data, tipo e categoria
- ✅ **Resumos Financeiros**: Visualização de totais e estatísticas
- ✅ **Interface Responsiva**: Design adaptável para diferentes dispositivos
- ✅ **Armazenamento Local**: Dados sincronizados com a API

### API Backend
- ✅ **Autenticação JWT**: Sistema seguro de autenticação
- ✅ **CRUD Completo**: Operações completas para usuários e transações
- ✅ **Validação de Dados**: Validação robusta com Zod
- ✅ **Documentação Swagger**: API totalmente documentada
- ✅ **Clean Architecture**: Código organizado e escalável
- ✅ **Múltiplos Bancos**: SQLite para dev, PostgreSQL para produção

## 🔧 Scripts Principais

### Backend
```bash
cd DT-money-backend
npm run dev          # Desenvolvimento
npm start            # Produção
npm run migration:run # Executar migrações
```

### Frontend
```bash
cd dt-money-app
npm start            # Servidor de desenvolvimento
npm run android      # Android
npm run ios          # iOS
npm run web          # Web
```

## 📊 Tecnologias Utilizadas

### Frontend
- React Native 0.79.5
- Expo ~53.0.20
- TypeScript ~5.8.3
- NativeWind ^4.1.23
- React Hook Form ^7.60.0
- Axios ^1.10.0
- Zod ^4.0.5

### Backend
- Node.js
- TypeScript 4.5.2
- Fastify ^5.1.0
- TypeORM 0.3.20
- SQLite3 ^5.1.7
- PostgreSQL ^8.4.0
- JWT ^9.0.2
- Bcrypt ^5.1.1

## 🔐 Segurança

- **Autenticação**: JWT tokens com expiração configurável
- **Criptografia**: Senhas criptografadas com bcrypt
- **Validação**: Validação rigorosa de entrada em ambos os lados
- **CORS**: Configuração adequada de CORS
- **Tratamento de Erros**: Sistema robusto de tratamento de erros

## 📚 Documentação

- **API**: Documentação Swagger disponível em `http://localhost:3001/documentation`
- **Frontend**: Componentes documentados com TypeScript
- **Backend**: Casos de uso e repositórios bem documentados

## 🧪 Testes

```bash
# Backend
cd DT-money-backend
npm test

# Frontend
cd dt-money-app
npm test
```

## 🚀 Deploy

### Backend
- Configure as variáveis de ambiente para produção
- Execute as migrações do banco de dados
- Configure o PostgreSQL para produção
- Deploy em plataforma como Heroku, Railway ou AWS

### Frontend
- Build para produção com Expo
- Deploy no Expo Application Services (EAS)
- Ou build nativo para as stores

## 📈 Próximos Passos

- [ ] Implementação de testes automatizados
- [ ] CI/CD pipeline
- [ ] Monitoramento e logging
- [ ] Funcionalidades de relatórios avançados
- [ ] Notificações push
- [ ] Sincronização offline

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Equipe

Desenvolvido com ❤️ pela equipe DT Money.

## 📞 Suporte

Para suporte, entre em contato através do email ou abra uma issue no repositório.

---

**DT Money** - Controle suas finanças de forma simples e eficiente! 💰
