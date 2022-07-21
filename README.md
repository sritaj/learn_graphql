<img src="https://cdn.codersociety.com/uploads/graphql-reasons.png" alt="GraphQL"/>

# Introduction To GraphQL

This repository includes examples and mini-projects demonstrating GraphQL features and implementations

## Tech Stack

1. JavaScript
2. NodeJS
3. GraphQL
4. PostgreSQL(Heroku)
5. TypeScript
6. Prisma
7. Apollo Server
8. GraphQL Yoga

## Pre-Requisite

1.  NPM

2.  [Nodemon](https://www.npmjs.com/package/nodemon) - For automatically restarting the node application when file changes are detected

         npm install -g nodemon

3.  Create Account at [ApolloGrapgQL](https://studio.apollographql.com/login?from=%2F) - To execute the Queries (required in all projects)

4.  Create Account at [Heroku](https://dashboard.heroku.com/) - To host PostgreSQL in cloud Server and connect to the local App using **Prisma** for integration (required in "blog-app" and "graphql_basics" project)

5.  [Prisma](https://www.npmjs.com/package/prisma) - ORM app to connect the Application with the Database and generating the models(db tables) and queries to retrieve info

        npm install -g prisma

## Getting Started / General Instructions

1. Clone/Download the Repository

2. In main project directory open terminal and run the command `npm install` to download all dependencies

3. Navigate to sub-projects and open terminal and run the command `npm install` to download all dependencies (_All packages present/added at main project directory are available to the sub-projects_)

## Projects

1. **e-commerce-app** - mini project, containing examples for GraphQL schemas, queries, implementation to check on the apollo live-server

2. **car-shop** - dummy project to list the best practices for defining GraphQL schemas, queries etc; no implementation to check

3. **blog-app** - mini project, showcasing GraphQL integration with PostgreSQL hosted in Heroku Platform, utilising Prisma ORM

4. **blog-app-frontend** - mini project, created on React platform, showcasing frontend integration with GraphQL backend(utilising **blog-app** project for backend portion)

5. **graphql_basics** - mini project, containing examples for GraphQL schemas, queries, implementation to check on the graphql yoga server, showcasing GraphQL integration with PostgreSQL hosted in Heroku Platform, utilising Prisma ORM

## Instructions

### e-commerce-app

1. Navigate to the Project **e-commerce-app**

2. Run the command `npm run start:dev` to start the live server

3. Execute the GraphQL queries in the Live server

### blog-app

1. Login to Heroku App, click on New and then click
   on Create New App, provide the details and click on Save

2. Next click on Candy Box Menu, click on Data, select PostgreSQL, select the free plan(hobby dev), continue and select the app created before and link it, save it

3. Select the DB created,go to settings, click on View credentials, copy the URI

4. Go to the Project **blog-app**, create .env file at root-level, and define the "DATABASE_URL", ex: `DATABASE_URL="postgres://acnpigodzgxyyy:8.....`, the URI is the one copied in above step

5. Open the terminal and run the command `npx prisma db push`, it will show the success message _🚀 Your database is now in sync with your Prisma schema._ and the Prisma Client will be generated [Check additional info for PRISMA DB connection](https://www.prisma.io/docs/concepts/components/prisma-client)

6. Run the command `npx prisma studio`, it will launch the studio in localhost, where user can see the models created using **schema.prisma** and for operating any CRUD operations

7. Run the command `npm run start:dev`, this will start the server; the localhost url will be displayed in the console on clicking which it will re-direct to the server

### blog-app-frontend

1. Navigate to the Project **blog-app**, make sure the instructions mentioned above are completed

2. Run the command `npm run start:dev` to start the live server and `npx prisma studio` to launch the studio in localhost (if not done)

3. Navigate to the Project **blog-app-frontend**, run the command `npm start` to start the ReactJS project

4. Navigate to the localhost instance opened up in the Browser, navigate to different URLs as specified in **_App.js_** to view the implementation

### graphql_basics

1. Follow steps 1 - 6 as specified for **blog-app** project

2. Run the command `npm run start`, this will start the server; the localhost url will be displayed in the console on clicking which it will re-direct to the server

## Additional NPM Libraries Used

1.  [Validator](https://www.npmjs.com/package/validator) - For validating Email, Password and relevant fields (instead of using Regex, checking length etc)

               npm install validator
               npm install @types/validator

2.  [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - For generating hashed passwords

               npm install bcyptjs
               npm install @types/bcryptjs

3.  [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken) - For generating token on user creation

               npm install jsonwebtoken
               npm install @types/jsonwebtoken

4.  [DataLoader](https://www.npmjs.com/package/dataloader) - For batching and caching API requests for fetching Data

               npm install --save dataloader

5.  [Babel](https://babeljs.io/) - Babel libraries for supporting modern JS features in older browser versions

               npm install --save-dev @babel/cli
               npm install --save-dev @babel/core
               npm install --save-dev @babel/node
               npm install --save-dev @babel/preset-env
               npm install --save-dev babel-plugin-transform-object-rest-spread

6.  [Prisma](https://www.prisma.io/) - Prisma specific packages

               npm install prisma --save-dev
               npm install @prisma/client

## Not Included/Implemented

1. Examples showcasing DB connection in local machine with GraphQL backend and PRISMA ORM (PostgreSQL setup for mini-projects is done at [Heroku](https://dashboard.heroku.com/))

## Special Thanks

Special Thanks to Instructors, online communities and official documentation which has done splendid job on explaining the concepts

- [Laith Harb](https://www.udemy.com/course/modern-graphql-complete-guide/)
- [Andrew Mead](https://www.udemy.com/course/graphql-bootcamp/)
