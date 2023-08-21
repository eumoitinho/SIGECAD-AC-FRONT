# SIGECAD - Sistema de Gerenciamento de Atividades Complementares

O SIGECAD (Sistema de Gerenciamento de Atividades Complementares) é uma aplicação web desenvolvida com o uso da biblioteca React. O objetivo principal do SIGECAD é facilitar o gerenciamento e correção de atividades complementares de estudantes, bem como fornecer uma plataforma para coordenadores acompanharem e avaliarem essas atividades.

## Como Começar

Este projeto foi criado utilizando o [Create React App](https://github.com/facebook/create-react-app). Aqui estão os principais comandos que você pode executar:

### `npm start`

Inicia o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizá-lo.\
A página será recarregada automaticamente sempre que você fizer alterações.

### `npm run build`

Compila o aplicativo para produção na pasta `build`.\
Ele otimiza a compilação para obter o melhor desempenho e está pronto para ser implantado.

## Funcionalidades Principais

O SIGECAD possui as seguintes funcionalidades principais:

- Autenticação de Alunos e Coordenadores
- Listagem de Alunos Matriculados em uma Disciplina
- Exibição de Certificados de Atividades Complementares
- Correção e Avaliação de Certificados por Coordenadores

## Componentes Principais

O projeto é organizado em componentes reutilizáveis que facilitam a manutenção e extensão da aplicação:

- `Login.js`: Página de login para alunos e coordenadores.
- `Home.js`: Página inicial do aluno, exibindo certificados e permitindo adicionar novos.
- `CorrectionArea.js`: Área de correção para coordenadores, onde podem avaliar certificados.
- `Tabela.js`: Componente de tabela que exibe os certificados dos alunos.
- `TabelaCoord.js`: Componente de tabela para coordenadores exibirem alunos matriculados.

## Proteção de Rotas

Para proteger rotas e garantir o acesso apenas a usuários autenticados, foram implementados os seguintes componentes:

- `ProtectedRoute.js`: Garante que somente usuários autenticados possam acessar rotas protegidas.
- `PublicRoute.js`: Garante que somente usuários não autenticados possam acessar rotas públicas.

## Aprenda Mais

Para aprender mais sobre a criação de aplicativos React, confira a [documentação do React](https://reactjs.org/).

## Personalização e Extensão

Este projeto oferece uma base sólida para gerenciamento de atividades complementares. Sinta-se à vontade para personalizar e estender o código conforme necessário para atender às suas necessidades específicas.

## Problemas e Suporte

Se você encontrar algum problema ou tiver dúvidas sobre o SIGECAD Atividades Complementares, sinta-se à vontade para entrar em contato com nossa equipe de suporte.

---

Este projeto foi desenvolvido por [João Vitor Moitinho Silva e Igor Zanatta Saraiva](https://github.com/eumoitinho).