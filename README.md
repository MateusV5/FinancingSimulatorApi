# FinancingSimulatorApi

## Objetivo do Projeto

Permitir que usuários realizem simulações de financiamento imobiliário pelos sistemas SAC e PRICE, detalhando parcelas, juros, amortização e saldo devedor. Usuários autenticados podem salvar e consultar um histórico pessoal de simulações.

## Problema Solucionado

A centralização do planejamento habitacional em uma ferramenta que compara diretamente os métodos SAC e PRICE, retendo cenários simulados de forma segura e privativa, sem armazenamento redundante de dados derivados.

## Evolução do Projeto

### Versão Inicial em Console

- Aplicação local em C# com entrada de dados via terminal, sem persistência e sem barramento HTTP.

### Migração para ASP.NET Core Web API

- Transformação da lógica em uma API RESTful moderna, expondo endpoints HTTP e trafegando dados em formato JSON.

### Integração com Banco de Dados

- Implementação do PostgreSQL utilizando o Entity Framework Core (ORM) e gerenciamento de esquema via Migrations.

### Implementação de Autenticação

- Proteção de rotas com JWT Bearer, identificando o usuário logado através de claims (ID, Nome, E-mail) injetadas no cabeçalho das requisições.

### Implementação do Histórico de Simulações

- Modelagem do relacionamento 1:N para vincular o histórico de simulações diretamente à conta do usuário autenticado.

## Tecnologias Utilizadas

- Linguagem e Runtime: C# / .NET Core 10
- Framework Web: ASP.NET Core Web API / Swagger (OpenAPI)
- Banco de Dados & ORM: PostgreSQL / Entity Framework Core / Npgsql
- Segurança: Autenticação JWT Bearer / Criptografia BCrypt.Net-Next
- Ferramentas: VS Code, .NET CLI, Postman e DBeaver

## Arquitetura do Projeto

Estrutura modular baseada em divisões de responsabilidades (camadas):

```txt
FinancingSimulatorApi/
├── Controllers/   # Exposição dos endpoints e recepção das requisições HTTP
├── DTOs/          # Objetos de transferência e validação de dados de entrada/saída
├── Models/        # Entidades do banco de dados e objetos de domínio
├── Services/      # Centralização das regras de negócio, cálculos e segurança
├── Data/          # Contexto do EF Core (AppDbContext) e conexões
└── Migrations/    # Histórico de versionamento do banco de dados
```

## Funcionalidades Implementadas

- Usuários: Cadastro, consulta, atualização e remoção de contas (CRUD).
- Autenticação: Login seguro via e-mail e senha, com geração de tokens JWT e rota de identificação (/api/Auth/me).
- Simulação de Financiamento: Motores de cálculo exatos para os sistemas SAC e PRICE (aberto ao público).
- Histórico de Simulações: Persistência automática de simulações vinculadas ao usuário logado e proibição de acesso a dados de terceiros.
- Validações: Críticas estruturais automáticas de dados de entrada via Data Annotations nos DTOs.

## Segurança

- Armazenamento de senhas utilizando hash irreversível com BCrypt (salt automático).
- Bloqueio e restrição de rotas sensíveis utilizando o atributo [Authorize].

## Banco de Dados

### Entidades Principais & Relacionamentos

- Usuario (1) <---> (N) Simulacao: Um usuário gerencia múltiplas simulações. A tabela Simulacoes possui chave estrangeira explícita vinculada à tabela Usuarios.

### Decisões de Persistência

- Sem Redundância: A tabela Simulacoes grava apenas os parâmetros básicos enviados (Valor, Entrada, Taxa, Prazo e Amortização). Listas de parcelas, juros acumulados e totais de amortização são dados calculados dinamicamente em memória pela camada de serviço no momento do retorno, otimizando o armazenamento físico.

## Endpoints da API

URL Base Local: http://localhost:5024

### Rotas

- POST /api/Usuarios — Cadastro de usuário (Público)
- GET /api/Usuarios — Listagem de usuários
- GET /api/Usuarios/{id} — Detalhes do usuário por ID
- PUT /api/Usuarios/{id} — Atualização de dados cadastrais
- DELETE /api/Usuarios/{id} — Remoção de usuário
- POST /api/Auth/login — Autenticação de credenciais com retorno de Token JWT (Público)
- GET /api/Auth/me — Perfil do usuário atualmente autenticado
- POST /api/Simulacao — Simulação de financiamento rápida (Público)
- POST /api/Simulacao/salvar — Executa cálculo e salva os dados no histórico do usuário
- GET /api/Simulacao/historico — Recupera o histórico de simulações do usuário logado
- GET /api/Simulacao/{id} — Busca uma simulação salva e realiza o recálculo dinâmico

### Padrão de Respostas da API

```json
{
  "success": true,
  "message": "Mensagem descritiva da operação.",
  "data": {}
}
```

## Prints do Projeto/Testes

### Swagger

- Rotas e Documentação no Swagger
![Rotas e Documentação no Swagger](./Assets%20Project/PrintRoutesSwagger.png)

### Postman Usuário

- Listar usuário (GET) Postman
![Listar usuário (GET) Postman](./Assets%20Project/Postman/GetUserByIdPostman.png)

- Criar usuário (POST) Postman
![Criar usuário (POST) Postman](./Assets%20Project/Postman/CreateUserPostman.png)

- Atualizar usuário (PUT) Postman
![Atualizar usuário (PUT) Postman](./Assets%20Project/Postman/PutUserPostman.png)

- Deletar usuário (DELETE) Postman
![Deletar usuário (DELETE) Postman](./Assets%20Project/Postman/DeleteUserPostman.png)

- Testes de login no Postman
![Testes de login no Postman](./Assets%20Project/Postman/loginPostman.png)

### Postman Simulação

- Realizar simulação
![Realizar simulação](./Assets%20Project/SimulationPostman.png)

- Realizar e salvar simulação
![Realizar e salvar simulação](./Assets%20Project/SimulateSavePostman.png)

- Listar simulação pelo ID
![Listar simulação pelo ID](./Assets%20Project/FindSimulationPostman.png)

### DBeaver

- Tabela de usuários no DBeaver
![Tabela de usuários no DBeaver](./Assets%20Project/DBeaver/UserTableDBeaverPgSQL.png)

- Tabela de simulações no DBeaver
![Tabela de simulações no DBeaver](./Assets%20Project/DBeaver/SimulationTableDBeaverPgSQL.png)

- Diagrama de relacionamento no DBeaver
![Diagrama de relacionamento no DBeaver](./Assets%20Project/DBeaver/DiagramDBeaverPgSQL.png)

## Estado Atual do Projeto

O ecossistema backend está funcional. Possui motores de cálculo validados, persistência configurada no PostgreSQL via EF Core, barramento de segurança robusto com JWT/BCrypt e cobertura de testes locais via Postman.

## Próximas Etapas

- Tratar exclusão em cascata (Cascade Delete) de simulações ao remover usuários.
- Centralizar exceções em um Middleware global de tratamento de erros.
- Configurar políticas de CORS.
- Desenvolver a interface web SPA utilizando React e integrá-la às rotas autenticadas da API.

## Objetivo Futuro

Disponibilizar a aplicação Fullstack completa (React + ASP.NET Core + PostgreSQL) hospedada em ambiente de nuvem, acompanhada de inteligência assistida e documentação para uso real e acadêmico.
