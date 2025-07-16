# My-profile

Projeto desenvolvido usando as seguintes tecnologias: Angular, Tailwind (front-end); Express, TypeORM, Node (back-end). Permite visualizar uma lista de usuários, selecionar um perfil para ver os detalhes, editar o perfil e salvar os dados.

## Como iniciar localmente

1 - Crie um banco de dados MySQL localmente chamado `my-profile`.

2 - Clone o repositório:

```bash
git clone https://github.com/victorgomesdev/teste-pratico.git
```

3 - Instale as dependências do back-end:

```bash
cd backend
npm i
```

4 - Execute as migrações:

````bash
npm run migrate
````

5 - Inicie o servidor:
````bash
npm run start:prod
````

6 - Instale as dependências do front-end:
````bash
cd ..
cd my-profile
npm i -g @angular/cli@19.2.8 # Necessário para fazer o build
npm i
````

7 - Inicie o projeto localmente:
````bash
npm start
````