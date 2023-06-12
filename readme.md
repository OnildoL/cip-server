## CIP | Esta é uma API de um back-end para controle interno de notas e produtos. Foi escrito em Node.js e TypeScript seguindo os princípios da Clean Architecture.

Para executar este projeto você precisará criar um arquivo `.env` na raiz do seu projeto com valores para as seguintes variáveis de ambiente:

- `PORT`
- `NODE_ENV`
- `JWT_SECRET`
- `DATABASE_URL`
- `BCRYPT_ROUNDS`

## Requisitos Funcionais

São as funcionalidades específicas que o sistema deve oferecer para atender às necessidades do usuário e cumprir os objetivos do negócio. Eles definem o que o sistema deve fazer.

### `Empresa & Setor`

- [x] Deve ser possível cadastrar uma empresa;
- [ ] Deve ser possível listar todas as empresas;
- [ ] Deve ser possível editar um empresa;
- [ ] Deve ser possível desativar uma empresa;

- [x] Deve ser possível cadastrar um setor;
- [ ] Deve ser possível listar todas os setores;
- [ ] Deve ser possível editar um setor;
- [ ] Deve ser possível excluir um setor;

### `Usuário`

- [x] Deve ser possível se cadastrar;
- [ ] Deve ser possível listar todos os usuários;
- [ ] Deve ser possível editar um usuário;
- [ ] Deve ser possível desativar um usuário;
- [ ] Deve ser possível se autenticar;

### `Permissões`

- [x] Deve ser possível cadastrar uma permissão;
- [ ] Deve ser possível listar todas as permissões
- [ ] Deve ser possível editar uma permissão;
- [ ] Deve ser possível excluir uma permissão;

### `Metas de compra e pedidos`

- [x] Deve ser possível cadastrar uma meta;

### `Acertos`

- [ ]

### `Devoluções`

- [ ]

## Requisitos Não Funcionais

São as características do sistema que garantem sua qualidade e adequação ao uso, como a performance, segurança, usabilidade, escalabilidade, dentre outras. Eles definem como o sistema deve fazer.

### `Usuário`

- [x] A senha do usuário precisa estar criptografada;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
- [ ]

### `Metas de compra e pedidos`

- [ ]

### `Acertos`

- [ ]

### `Devoluções`

- [ ]

### `Aplicação`

- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- [ ]

## Regras de Negócio

São as restrições, políticas, procedimentos e diretrizes que regem a operação do negócio. Elas definem as restrições e diretrizes que o sistema deve seguir para atender às necessidades do negócio e dos usuários.

### `Usuário`

- [x] O usuário não deve poder se cadastrar com um usuário duplicado;

### `Metas de compra e pedidos`

- [ ]

### `Acertos`

- [ ]

### `Devoluções`

- [ ]

Copyright © 2023 CIP
