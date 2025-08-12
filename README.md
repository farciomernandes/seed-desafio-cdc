# Desafio Dev Eficiente 01

Cadastro de um novo autor
necessidades
É necessário cadastrar um novo autor no sistema. Todo autor tem um nome, email e uma descrição. Também queremos saber o instante exato que ele foi registrado.
restrições
O instante não pode ser nulo
O email é obrigatório
O email tem que ter formato válido
O nome é obrigatório
A descrição é obrigatória e não pode passar de 400 caracteres
resultado esperado
Um novo autor criado e status 200 retornado

## Como rodar o projeto

1. Instale as dependências:

   ```sh
   npm install
   ```

2. Configure as variáveis de ambiente (crie um arquivo `.env`):

   ```env
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=seu_usuario
   POSTGRES_PASSWORD=sua_senha
   POSTGRES_DB=seu_banco
   POSTGRES_DB_TEST=seu_banco_test
   NODE_ENV=development
   APP_PORT=3000
   ```

3. Suba o banco de dados Postgres (pode usar Docker):

   ```sh
   docker-compose up -d
   ```

4. Rode a aplicação:
   ```sh
   npm run start:dev
   ```

## Como rodar os testes

- Testes unitários:
  ```sh
  npm run test
  ```
- Testes e2e:
  ```sh
  npm run test:e2e
  ```

## Como usar migrations

- Criar uma nova migration:
  ```sh
  npm run migration:create NomeDaMigration
  ```
- Rodar as migrations:
  ```sh
  npm run typeorm migration:run
  ```
- Reverter a última migration:
  ```sh
  npm run typeorm migration:revert
  ```

## Observações

- Os testes e2e usam SQLite in-memory automaticamente.
- Para rodar localmente, garanta que o banco Postgres esteja disponível.
- As migrations são gerenciadas pelo TypeORM.
