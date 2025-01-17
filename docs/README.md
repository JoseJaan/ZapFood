## :books: Descrição do produto

ZapFood consiste em um sofwtare capaz de prover uma conexão entre clientes e lojas. Cada loja poderá se cadastrar no sistema web e administrar sua loja online. Cada cliente poderá se cadastrar no sistema e realizar pedidos por produtos nas lojas cadastradas. Cada loja poderá controlar seu horário de funcionamento, produtos e vendas.
O sistema conta com administradores gerais que possuem permissão para visualizar e editar todos os dados existentes. O cliente, a loja e o adminstrador do sistema terão autenticação com login e senha criptografados. A aplicação seguirá um modelo de estruturação MVC, utilizando Ejs, Express, Sequelize e mysql. As imagens dos produtos ficarão armazenadas no Cloudinary.

## 💻 Tecnologias utilizadas
- NodeJS 18
- Express 5 
- Sequelize 6.37
- MySql 8
- Cloudinary 2.5
- EJS 3.1
- HTML5
- CSS3

## 🧑‍💻 Regras de código adotadas
- Adoção do padrão camelCase.
- Obrigatoriedade de um comentário explicativo para cada função.
- Adoção da "Single Responsability" para funções.
- Limitação de 25 linhas por função.
- Aplicação do DRY, visando reutilização de código.
- Validação e tratamento de erros de forma padronizada.

## 🧑‍💻 Regras e padrões de Git adotadas
- Commits devem ser realizados em português seguindo o padrão de commits semânticos, com base nessa [documentação](https://github.com/iuricode/padroes-de-commits).
- Adoção da "Single Responsability" para cada commit.
- A branch `main` deve conter o código mais estável. 
- As branches `front` e `back` deverão conter os códigos mais atualizados.
- Para cada nova alteração e modificação no código, deverá ser criada uma nova branch, chamada de `branch de trabalho`, respeitando a seguinte nomenclatura:
    - **feature/**: Para novas funcionalidades.  
      Exemplo: `feature/pagina-login`.
    - **bugfix/**: Para correções de bugs.  
      Exemplo: `bugfix/fix-login-error`.
    - **hotfix/**: Para correções urgentes em produção.  
      Exemplo: `hotfix/login-empresa`.
    - **refactor/**: Para refatorar uma parte do código.  
      Exemplo: `refactor/refatorado-login-cliente`.
 - Após a modificação for concluída em uma `branch de trabalho`, deve ser criado um Pull Request para uma das branches secundárias: `front` ou `back`, a depender da modificação.
 - A cada 2 dias, as branches `front` e `back` devem ser mergeadas na `main` após haver garantia de que estão funcionais e consistentes. 

## 🔐 Arquivo .env
- São utlizadas diferentes variáveis de ambiente que são necessárias para o funcionamento do código, sendo elas:
  - `DB_USER`= Seu usuário do banco de dados
  - `DB_PASSWORD` = Sua senha do banco de dados
  - `JWT_SECRET` = Chave utilizada para criação de tokens JWT. A chave utilizada é ```IceWcH`LhiH"9GvRc<F*OGYti^B74{;<fj]Y:Y$Qkt9C6OaHUp:`MOTpMZD3^M@```


## 📁 Estrutura de pastas

```
├── docs                                                            -- Documentação do projeto
│    ├── Padrões Adotados
│    │    └── Regras de Verificação e Análise de Requisitos.pdf
│    ├── Requisitos
│    │    └── Documento de Requisitos.pdf
│    └── README.MD 
├── src                                                             -- Src do projeto
│    └── App.js                     
├── .gitignore
└── package.json                                           
```

## ✍🏻 Autores
| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/120669342?v=4" width=115><br><sub>José Acerbi Almeida Neto</sub>](https://github.com/JoseJaan) |  | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/137515142?v=4" width=115><br><sub>Rafael Alves Silva Rezende</sub>](https://github.com/rafa-rez) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/127694839?v=4" width=115><br><sub>Gabriel Ferreia de Castro</sub>](https://github.com/Ferreira327)
| :---: | :---: | :---: | :---: |