<img src="https://cdn.codersociety.com/uploads/graphql-reasons.png" alt="GraphQL"/>

# Introduction To GraphQL

This repository includes examples and mini-projects demonstrating GraphQL features and implementations

## Tech Stack

1. JavaScript
2. NodeJS
3. GraphQL
4. PostgreSQL
5. TypeScript
6. Heroku
7. Prisma

## Pre-Requisite

1.  NPM

2.  Nodemon - For automatically restarting the node application when file changes are detected

         npm install -g nodemon

3.  Create Account at [ApolloGrapgQL](https://studio.apollographql.com/login?from=%2F) - To execute the Queries (required in all projects)

4.  Create Account at [Heroku](https://dashboard.heroku.com/) - To host PostgreSQL in cloud Server and connect to the local App using **Prisma** for integration (required in "blog-app" project)

5.  Prisma - ORM app to connect the Application with the Database and generating the models(db tables) and queries to retrieve info

        npm install -g prisma

## Getting Started

1. Clone/Download the Repository

2. In main project directory open terminal and run the command `npm install` to download all dependencies

3. Navigate to sub-projects and open terminal and run the command `npm install` to download all dependencies (_All packages present/added at main project directory are available to the sub-projects_)

4. **e-commerce-app** - For e-commerce-app mini project, run the command `npm run test-live`, this will start the server; the localhost url will be displayed in the console on clicking which it will re-direct to the server

5. **car-shop** - dummy project to list the best practices for defining GraphQL schemas, queries etc; no implementation to check

6. **blog-app** -

## Instructions

### blog-app

1. Login to Heroku App, click on New and then click
   on Create New App, provide the details and click on Save

2. Next click on Candy Box Menu, click on Data, select PostgreSQL, select the free plan(hobby dev), continue and select the app created before and link it, save it

3. Select the DB created,go to settings, click on View credentials, copy the URI

4. Go to the Project, create .env file at root-level, and define the "DATABASE_URL", ex: `DATABASE_URL="postgres://acnpigodzgxyyy:8.....`, the URI is the one copied in above step

5. Open the terminal and run the command `npx prisma db push`, it will show the success message _🚀 Your database is now in sync with your Prisma schema._ and the Prisma Client will be generated

6. Run the command `npx prisma studio`, it will launch the studio in localhost, where user can see the models created using **schema.prisma**

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

## Special Thanks

Special Thanks to Instructors, online communities and official documentation which has done splendid job on explaining the concepts

- [Laith Harb](https://www.udemy.com/course/modern-graphql-complete-guide/)
