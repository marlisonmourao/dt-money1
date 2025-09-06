# DT Money App

Um aplicativo mobile de controle financeiro pessoal desenvolvido com React Native e Expo.

## 📱 Sobre o Projeto

O DT Money App é uma aplicação mobile que permite aos usuários gerenciar suas finanças pessoais de forma simples e intuitiva. O app oferece funcionalidades para controle de receitas e despesas, categorização de transações e visualização de resumos financeiros.

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Linguagem de programação tipada
- **Expo Router** - Roteamento para aplicações Expo
- **NativeWind** - Framework CSS para React Native
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Axios** - Cliente HTTP
- **AsyncStorage** - Armazenamento local
- **React Native Reanimated** - Animações nativas

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)

### Passos para instalação

1. Clone o repositório:
```bash
git clone https://github.com/marlisonmourao/dt-money1.git
cd dt-money-app
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
# ou
yarn start
```

4. Execute no dispositivo/emulador:
```bash
# Android
npm run android
# ou
yarn android

# iOS
npm run ios
# ou
yarn ios

# Web
npm run web
# ou
yarn web
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Páginas da aplicação
│   ├── (private)/         # Rotas privadas
│   ├── index.tsx          # Página de login
│   └── register.tsx       # Página de registro
├── components/            # Componentes reutilizáveis
├── context/              # Contextos do React
├── shared/               # Código compartilhado
│   ├── api/              # Configuração da API
│   ├── hooks/            # Hooks customizados
│   ├── interfaces/       # Interfaces TypeScript
│   ├── services/         # Serviços da aplicação
│   └── utils/            # Utilitários
├── styles/               # Estilos globais
└── types/                # Definições de tipos
```

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa no navegador
- `npm test` - Executa os testes

## 📱 Funcionalidades

- **Autenticação**: Login e registro de usuários
- **Transações**: Criação, edição e exclusão de transações
- **Categorias**: Categorização de receitas e despesas
- **Filtros**: Filtros por data, tipo e categoria
- **Resumos**: Visualização de totais e estatísticas
- **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela

## 🎨 Design System

O projeto utiliza o NativeWind para estilização, permitindo o uso de classes CSS similares ao Tailwind CSS. As cores e temas estão definidos em `src/styles/colors.ts`.

## 🔗 Integração com Backend

O app se conecta com a API backend através de endpoints REST configurados em `src/shared/api/dt-money.ts`. A autenticação é feita via JWT tokens armazenados no AsyncStorage.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato através do email ou abra uma issue no repositório.
