# Front-end

## Estilização

Sempre no começo de um projeto, é importante colocar as propriedades margin e padding como 0, isso serve para remover espaçamentos internos e margens aplicados por padrão nos elementos, permitindo maior controle durante o desenvolvimento.

Outra propriedade importante no começo é box-sizing com o valor border-box, isso faz com que o tamanho total dos elementos inclua o padding e as bordas, facilitando o controle do layout e evita cálculos inesperados no tamanho dos elementos

A propriedade min-height com valor 100vh (view-heught) define que o corpo da página sempre terá no mínimo 100% da altura da viewport, layout preenche tota a tela.

A viewport é a área visível para o usuário de uma página web. Inicialmente as páginas possuiam design apenas para computadores, estáticos e com tamanhos fixos.

Com o advento de celulares e tablets, foi necessário adaptar esse conceito para os novos aparelhos. Definir essa propriedade faz com que a tela do usuário seja compatível com o aparelho que ele estiver utilizando.

### Importar Estilo Global 

Para importar um estilo global na aplicação, primeiro precisamos encontrar a tag de importação. Por exemplo no gooogle fonts seguindo o segunite caminho podemos encontrar essa tag: 
`get font => get embed code => @import (tag)` 
Com a tag em mãos, basta colocar ela no index.css e selecionar na estilização geral (*) a font-family desejada.

### Animações
É possível fazer animações no css utilizando a tag @keyframe. Ela pode ser criado no index.css para ser utilzada em toda a aplicação com a propriedade animation.

Exemplo de animação:
```
@keyframes fadeIn {
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
}

animation: fadeIn 1s;
```

### Display grid
O display grid permite organizar itens em forma de tabelas, com linhas e colunas com tamanhos definidos.

Guia completo sobre grid layout: [Guia Grid](https://www.origamid.com/projetos/css-grid-layout-guia-completo/)

### Popup de login
No arquivo app.jsx colocar popup é basicamente colocar um componente com z-index de valor 1 no e renderizar ele acima do app, usar um estado para organizar se ele está visivel ou não e colocar uma cor de fundo diferente para dar a mais foco para o popup.

## Arquitetura e  Organização

- **`src/main.jsx`** -> Inicio da aplicação, renderiza o componente \<App /> que está englobado pelo \<ContextProvider /> para compartilhar o contexto com todo o app e pelo \<BrowseRouter /> para gerenciar as rotas do frontend.
- **`src/App.jsx`** -> Contém a estrutura principal da apliacação, com o condicional de aparecimento do Popup de login, o compoente \<ToastContainer /> para permitir a utilização da biblioteca, a \<Navbar /> e \<Footer /> da aplicação e o gerenciamento de rotas.
- **`package.json`** -> Dependências do projeto
-src/index.css -> estilização global da aplicação 

## Contexto
O contexto em React é uma ferramenta que permite o compartilhamento de informações entre os componentes sem a necessidade de passar propriedades para cada nível na component tree.

Essa aplicação possui um único contexto que é compartilhado com todos os componentes que necessiatam dele. 

Dentre as principais funções e propriedades, temos:
- **Carrinho de compras** -> o carrinho de compras do usuário é compartilhado e controlado pelo contexto da aplicação, contendo funções para adicionar ou remover um item do carrinho e para calculo do preço total acumulado dentro do carrinho
- **Token de autenticação** -> o token de autenticação é gerenciado pelo popup de login e fica disponível no contexto para o uso nos componentes necessários, inclusive dentro de funções do próprio contexto que necessitem de uma verificação
- **URL do servidor** -> a url do servidor também é definida no contexto para centralizar e melhorar a manutenção
- **Lista dos alimentos** -> outra informação importante armazenada no contexto é a lista de todos os alimentos contidos no banco de dados

## Rotas
Para criar rotas na apliação, primeiro é necessário encapsular o componente \<App /> com o \<BrowserRouter /> da biblioteca react-router-dom. 

No `app.jsx` é preciso também colocar o componente \<Routes > e um componente \<Route > para cada rota existente na aplicação 

A aplicação possui no total 5 rotas, sendo elas:
- **`/`** -> Home page da aplicação
- **`/cart`** -> Carrinho de compras do usuário 
- **`/order`** -> Finalização do pedido e encaminha para o pagamento na plataforma Stripe
- **`/verify`** -> Uma tela intermediária entre a aplicação e o pagamento na plataforma Stripe. Essa página verifica se o pagamento do pedido foi feito e encaminha para a página com as ordens do usuário em caso afirmativo ou para a home em caso negativo
- **`/myorders`** -> Página com todas as ordens já efetivadas pelo usuário, contendo o status de cada uma  
  
## Contexto

Contexto:
Serve para criar um context api para gerenciar e compartilhar estados globais entre componentes sem precisar passar cada prop nos componentes
Criar uma pasta em src chamado context e criar o context. Cada context precisa ter um creatContext(null ou não para ter um valor inicial)
Depois criar um context provider, que vai disponibilizar o contexto para todos os filhos do contexto (a aplicação toda)
<StoreContextProvider>
    <App /> app todo tem o contextValue à disposição
</StoreContextProvider>
Para fazer uso do contexto dentro de algum componente, basta utilizar o useContext(StoreContext) e o contexto criado como valor inicial

# Backend

## Bibliotecas e dependências

No backend são necessárias algumas bibliotecas para, abaixo estão todas elas e qual o seu uso:
- `express`: framework para Node.js, utilizado para criação de servidores web e APIs, gerenciamento de rotas, requisições HTTP e middlewares
- `mongoose`: biblioteca ODM (Object Data Moedling) para MongoDB e Node.js, fornece uma maneira estruturada para interagir com o MongoDB, permitindo criação de esquemas, além de facilitar validações, middlewares e consultas
- `jsonwebtoken` (JWT): biblioteca para gerar e verificar token JWT, implementação segura por meio de tokens, permitindo que o servidor valide a identidade do usuário sem armazenar sessões no backend
- `bcrypt`: biblioteca para hash de senhas, criptografa senhas antes de armazená-las no banco de dados, também é usada para comparar senhas fornecidas com hashes armazenados
- `cors` (Cross-Origin Resource Sharing): middleware para habilitar CORS em aplicações exprees, permite que o frontend faça requisições ao backend em domínios separados
- `dotenv`: carregar variáveis de ambiente a partir de um `.env`, armazena informações sensíveis fora do código-fonte, melhorando a segurança e facilitando a configuração do ambiente
- `body-parser`: middleware para analisar o corpo das requisições HTTP, converte dados enviados pelo usuário para objetos em JS acessíveis via req.body no express
- `multer`: middleware para manipulação de form-data, usado para upload de arquivos, permite que o usuário envie imagens e arquivos para o servidor, gerenciando armazenamento local ou em nuvem
- `stripe`: integração com API da Stripe, processa pagamentos online, gerencia cobranças e carteiras digitais, facilita a implementação de sistemas de pagamento em aplicações web
- `validator`: validação e sanitização de string, valida dados como e-mails, URLs, senhas
- `nodemon`: ferramenta de desenvolvimento que reinicia automaticamente quando o servidor Node.js detecta mudanças no código 

## Arquitetura e organização

A arquitetura utilizada pelo backend é um MVC Desacoplado/distribuído, ele possui as camadas Model e Controller, mas a View é separado no frontend.

O modelo MVC tradicional, utilizado por linguagens como Ruby on Rails possui a View diretamente integrada no backend. Já nesse tipo de arquitetura, a View é uma aplicação frontend separada que se comunica com o backend via HTTP.

A Model representa a camada de dados, modelagem e acesso ao banco de dados. 

A Controller gerencia a lógica da aplicação e a interação entre a Model e a View. Ela gerencia requisições do frontend, processa e retorna as respostas.

### Modelos e Controllers
- `Usuário` -> O modelo do usuário possui nome, email, senha e o carrinho de compras e o seu controlador gerenciar o login ou registro de um usuário, além da criação do token de autenticação para o frontend
- `Carrinho` -> O carrinho do usuário possui um controller separado, que possui as funções de adicionar e remover itens do carrinho, além de listar os itens para exibição no frontend
- `Comida` ->  O modelo da comida possui nome, descrição, preço, uma imagem e a categoria da comida. O controlador é responsável por cadastrar, remover ou listar as comidas no banco de dados
- `Pedido` -> O modelo do pedido possui o ID do usuário que o fez, os itens desse pedido, o preço total, o endereço, um status da entrega, a data e um campo para verificar se o pagamento foi feito. O controller dos pedidos possui a lógica de adição de um novo pedido e verificação se ele foi pago, duas leituras dos pedidos, uma para um cliente e outra para todos os pedidos da plataforma e uma maneira de alterar o status de um pedido.

## Endpoints

### Usuários
| Método  | Endpoint | Descrição                     |
|---------|-------------------------|--------------------------------|
| `POST`  | `/api/user/register`      | Registrar novo usuário       |
| `POST`   | `/api/user/login`    | Fazer o login na plataforma |
||||

### Carrinho
| Método  | Endpoint | Descrição                     |
|---------|-------------------------|--------------------------------|
| `GET`  | `/api/cart`      | Listar itens do carrinho       |
| `PATCH`  | `/api/cart/add`      | Adicionar item ao carrinho      |
| `PATCH`   | `/api/cart/remove`    | Remover item do carrinho |
||||

### Comida
| Método  | Endpoint | Descrição                     |
|---------|-------------------------|--------------------------------|
| `GET`  | `/api/food`      | Listar todas as comidas       |
| `POST`  | `/api/food/add`      | Adicionar uma comida      |
| `PATCH`   | `/api/food/remove`    | Remover uma comida |
||||

### Pedidos
| Método  | Endpoint | Descrição                     |
|---------|-------------------------|--------------------------------|
| `GET`  | `/api/order/userorders`      | Listar os pedidos de um usuário       |
| `GET`  | `/api/order/allorders`      | Listar os pedidos de todos os usuários       |
| `POST`  | `/api/order/add`      | Adiciona um novo pedido      |
| `POST`   | `/api/order/verify`    | Verifica se o pedido foi pago |
| `PUT`   | `/api/order/status`    | Modifica o status de um pedido |
||||

## Middleware

Middleware é uma função que tem acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função de middleware no cilo de requisições e respostas (next).

O middleware é utilizado para processar requisições antes delas chegarem ao endpoint final, modificando a req e a res. Esse mecanismo auxilia no cotrole do fluxo da aplicação, decidindo se a requisição deve ir ou não para a próxima função, auxiliando também no gerenciamento e tratamento de erros.

Essa aplicação possui apenas um middleware de autenticação, que é usado para adicionar um novo pedido ou listar os pedidos de um usuário, além de ser usado para adicionar, remover ou acessar o carrinho de um usuário. 

Sempre que alguma dessas ações for feita, o middleware é chamado para verificar se existe um usuário logado e se ele tem acesso à essa funcionalidade.

## Banco de dados

O banco de dados utilizado foi o MongoDB, um bando de dados não relacional.

Para criar uma nova database, selecionamos o mongoose no cluster no site Mongo Atlas. Os cluster são criados com 3 nós para auxiliar na resiliência do sistema.

Adicionar o ip 0.0.0.0 para permitir que o banco de dados seja acessado por qualquer ip.

Criamos um arquivo `db.js` para fazer a conexão e a desconexão com o banco de dados.

## Autenticação

A autenticação é feita usando algumas das ferramentas instaladas inicialmente.

A primeira delas é o validator para confirmar se o email e senha são válidos.

Uma vez que forem válidos, a parte de criptografar a senha utiliza bcrypt para esse processo.

Inicialmente um `salt` é gerado, esse `salt` é uma sequência aleatória de caracteres adicionada à senha antes dela passar por um algoritmo de hash. O número 10 representa o custo computacional da operação. Cada incremento no valor, dobra o tempo necessário para o cálculo do hash.

Por exemplo, se a senha do usuário for `senha123`, o salt pode ser algo como `qE4#s5T!8`. A string final hasheada fica algo como `senha123qer#s5T!8`.

Depois disso um algoritmo de hash é aplicado sobre a senha, tornando as senhas e a proteção resistentes à ataques de força bruta.

Quando o usuário for fazer o login, o bcrypt é utilizado para comparar a senha digitada com a senha hasheada.


## Pagamento

A integração com Stripe é feita para facilitar o pagamento dos pedidos.

Como o stripe espera o valor em centavos, é necessário multiplicar os preços por 100.

Após adicionar quais os itens faram parte da compra com os line_items, é necessário configurar a sessão do stripe. 

Essa sessão encaminha a plataforma para a página de pagamento do stripe e logo após encaminha para uma página de sucesso ou de falha no pagamento.

## Testes

Os testes em um sistema podem ser de vários tipos. 

- Testes unitários: garantem que funções e componentes individuais funcionem como esperado, como validação dos dados do pedido, cálculo de preços totais
- Testes de integração: testar a integração entre diferentes módulos, como testar a criação de um pedido com a integração do Stripe ou atualização do carrinho após o pagamento
- Testes de API (End-to-End para backend): garantir que a API funciona conforme esperado sob diferentes cenários
- Testes End-to-End (E2E): testar o fluxo completo do usuário (frontend + backend), do login ao pagamento concluído, cancelamento de pedidos
- Testes de performance: avaliar a escalabilidade do sistema sob carga, como processar simultaneamente múltiplos pedidos

Os testes existentes até o momento são testes de API, que testam todos os casos de todos os endpoints da API utilizando jest.

### Automação dos testes, CI/CD

Além da criação dos testes, foi feita a automatização dos testes utilzando um docker rodando o jenkins.

O jenkins roda em uma porta da máquina e para ser possível utilzair uma URL para esse serviço, é utilizado o CloudFlare Tunnel, realizando assim o tunelamento da porta 8080 em uma URL compartilhável.

Esse URL é então integrada com WebHooks do github, possibilitandom a automação dos testes no ambiente de desenvolvimento.

Um script gera essa URL para configuração do WebHook automaticamente.

# Página Administrativa

## Bibliotecas e dependências

Admin:
axios para fazer as requisições
react-toastify para fazer as notificações
react-router-dom para as rotas

# Variáveis de ambiente

Variáveis de ambiente:
para usar variáveis de ambiente basta importat o 'dotenv/config' no server.js e usar nos arquivos com process.env.JWT_SECRET (nome da var)

# Automação dos testes, CI/CD

Automatização de testes:
jenkins, tunelamento de localhost para cloudflare