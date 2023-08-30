# Analisador PEX API

## Setup

```bash
# install dependencies
$ npm install

# Running migrations
$ npx sequelize-cli db:create
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all   

# If necessary to undo migrations or seeds
$ npx sequelize-cli db:migrate:undo
$ npx sequelize-cli db:seed:undo:all

# start server at localhost:3001
$ npm run start
```
