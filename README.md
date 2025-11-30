# Publications Management API

A robust NestJS-based REST API for managing scientific publications with comprehensive authentication, authorization, and validation features.

## Project Overview

This project implements a full-featured publications management system that allows users to create, read, update, and delete scientific publications with proper access control and data validation.

## Technology Stack

- **Framework**: NestJS with TypeScript
- **Validation**: class-validator & class-transformer
- **Authentication**: Custom JWT-like token system
- **Architecture**: Modular with dependency injection
- **Logging**: Custom interceptors and middleware

## Key Features

### 🏗️ Modular Architecture
- **Core Module**: Global providers including exception filters, interceptors, and middleware
- **Auth Module**: Authentication and authorization guards with role-based access control
- **Publications Module**: Business logic for managing publications with CRUD operations
- **App Module**: Main module that orchestrates all application components

### 🔐 Authentication & Authorization
- **JWT-like Token System**: Base64-encoded tokens containing user ID and roles
- **Role-Based Access Control**: Three-tier permission system (public, editor, admin)
- **Guards Implementation**: AuthGuard validates tokens, RolesGuard checks permissions
- **Flexible Role Decorator**: Easy role assignment to controller methods

### 📊 Publications Management
- **CRUD Operations**: Full create, read, update, delete functionality
- **Data Filtering**: Filter publications by author using query parameters
- **Ownership Control**: Users can only edit their own publications (unless admin)
- **In-Memory Storage**: Simple data persistence (resets on server restart)

### ✅ Data Validation
- **DTO Validation**: Comprehensive input validation using class-validator
- **Global Validation Pipe**: Automatic request validation and transformation
- **Strict Field Checking**: Whitelist validation with proper error messages
- **Type Safety**: Automatic type conversion and boundary checking

### 🛡️ Error Handling
- **Global Exception Filter**: Unified error response format
- **Comprehensive Logging**: Detailed error logging with context
- **User-Friendly Messages**: Clear error descriptions for clients
- **HTTP Status Codes**: Proper status codes for different error scenarios

### 📈 Request Processing Pipeline
- **Request Logging Middleware**: Logs all incoming HTTP requests (except health checks)
- **Performance Monitoring**: Response time tracking via interceptors
- **Response Transformation**: Standardized response format with metadata
- **Health Check Endpoint**: Service monitoring endpoint excluded from logging

### 🔒 Security Features
- **Input Sanitization**: Automatic removal of unexpected fields
- **Role Verification**: Server-side role validation
- **Ownership Verification**: Prevents unauthorized data modification
- **Token Validation**: Secure token decoding and validation

## API Capabilities

- **Public Access**: Read operations (GET publications)
- **Editor Role**: Create new publications
- **Admin Role**: Full system access including deletion
- **Ownership-Based Editing**: Users can modify their own content
- **Filtered Views**: Author-based publication filtering

## Project Structure
```text
src/
├── app.module.ts # Main application module
├── main.ts # Application entry point
├── core/ # Global functionality
│ ├── core.module.ts
│ ├── http-exception.filter.ts
│ ├── logging.interceptor.ts
│ ├── transform.interceptor.ts
│ └── request-logger.middleware.ts
├── auth/ # Authentication & authorization
│ ├── auth.module.ts
│ ├── auth.guard.ts
│ ├── roles.guard.ts
│ ├── roles.decorator.ts
│ └── auth-user.interface.ts
└── publications/ # Business logic
├── publications.module.ts
├── publications.controller.ts
├── publications.service.ts
├── publication.interface.ts
├── create-publication.dto.ts
└── update-publication.dto.ts
```


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
