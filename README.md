# User Transaction Api

REST API with NestJS framework and postgreSQL database

## [User-Transaction-Api](https://github.com/HasanNugroho/user-transaction-api.git)

## Getting Started

### Requirements

- Node.js (v18+)
- PostgreSQL
- (Optional) Docker & Docker Compose

### Install & Run

Download this project:

```shell script
git clone https://github.com/HasanNugroho/user-transaction-api.git
```

### Manual Installation

Install dependencies

```shell script
npm install
```

Copy environment variables

```shell script
cp .env.example .env
```

```shell script
# Application Configuration
NODE_ENV=development
PORT=3000

# PostgreSQL Database Configuration
DB_USER=dbUser
DB_PASS=dbPass
DB_NAME=test
DB_PORT=5432
DB_HOST=localhost

```

Before running this project, make sure to configure your environment variables by copying .env.example and updating it with your own values.

#### Run the App

```shell script
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# running on default port 3000
```

### Run with Docker (Recomended)

```shell script
docker-compose up -d
```

### API Documentation

This project uses **Swagger** for API documentation. you can access the documentation at: **[http://localhost:3000/api](http://localhost:3000/api)**

## Structures

```
user-transaction-api
├── Dockerfile
├── README.md
├── docker-compose.yml
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.module.ts
│   ├── applications
│   │   ├── guards
│   │   │   └── auth.guard.ts
│   │   └── service
│   │       ├── auth.service.ts
│   │       ├── service.module.ts
│   │       ├── transaction.service.ts
│   │       └── user.service.ts
│   ├── common
│   │   ├── constant.ts
│   │   ├── decorators
│   │   │   └── public.decorator.ts
│   │   ├── dto
│   │   │   └── response.dto.ts
│   │   └── filter
│   │       └── http-exception.filter.ts
│   ├── domains
│   │   ├── model
│   │   │   ├── transaction.ts
│   │   │   └── user.ts
│   │   ├── repository
│   │   │   ├── transaction.repository.interface.ts
│   │   │   └── user.repository.interface.ts
│   │   └── service
│   │       ├── auth.service.interface.ts
│   │       ├── transaction.service.interface.ts
│   │       └── user.service.interface.ts
│   ├── infrastructures
│   │   ├── config
│   │   │   └── database.config.ts
│   │   ├── entity
│   │   │   ├── transaction.entity.ts
│   │   │   └── user.entity.ts
│   │   └── repository
│   │       ├── repository.module.ts
│   │       ├── transaction.repository.ts
│   │       └── user.repository.ts
│   ├── main.ts
│   ├── migrations
│   │   └── 1752690379585-init.ts
│   └── presentations
│       ├── transaction
│       │   ├── dto
│       │   │   └── process-transaction.dto.ts
│       │   └── transaction.controller.ts
│       └── user
│           ├── auth.controller.ts
│           └── dto
│               ├── auth.dto.ts
│               └── create-user.dto.ts
├── tsconfig.build.json
└── tsconfig.json
```

## API Endpoints

| Method | Endpoint               | Deskripsi                                  | Autentikasi     |
| ------ | ---------------------- | ------------------------------------------ | --------------- |
| POST   | `/register`            | Register user baru                         | ❌              |
| POST   | `/login`               | Login user, return token                   | ❌              |
| GET    | `/transaction`         | Lihat riwayat transaksi user               | ✅ Bearer Token |
| POST   | `/transaction/process` | Buat atau update transaksi (dengan `?id=`) | ✅ Bearer Token |

## Credits

- **[NestJS](https://nestjs.com/)** - A framework server-side applications.
- **[TypeORM](https://typeorm.io/)** - An ORM for TypeScript and JavaScript.
- **[Swagger](https://swagger.io/)** - A tool API documentation.
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database system.

## Copyright

Copyright (c) 2025 Burhan Nurhasan Nugroho.
