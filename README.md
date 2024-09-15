# Next JS T3 Stack App with Repository Pattern

This project is built using the T3 stack App with additional features like shadcn UI components and a repository design pattern for tRPC routers.

## Features

- **Next.js 14+**: React framework with App Router for building web applications
- **TypeScript**: For type-safe JavaScript development
- **tRPC**: End-to-end typesafe APIs
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **NextAuth.js**: Authentication for Next.js
- **Zod**: Runtime type checking and validation
- **shadcn/ui**: Beautifully designed components built with Radix UI and Tailwind CSS
- **Repository Pattern**: For clean separation of data access logic
- **Service Layer**: Business logic abstraction
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: For identifying and fixing code quality issues
- **Prettier**: For consistent code formatting

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── _components/
│   │   │   ├── discord-login-button.tsx
│   │   │   ├── latest-posts.tsx
│   │   │   ├── signin-form.tsx
│   │   │   ├── signup-form.tsx
│   │   │   └── navbar/
│   │   │   |   ├── navbar-wrapper.tsx (server component that will consumes session from the server)
│   │   │   |   └── navbar.tsx
│   │   ├── api/
│   │   │   └── trpc/
│   │   │   |   └── [trpc]/
│   │   │   |       └── route.ts (the main route api that will do HTTP request to trpc server)
│   │   │   └── auth/
│   │   │       └── [...nextAuth]/
│   │   │           └── route.ts (for nextAuth)
│   │   ├── posts/
│   │   │   └── page.tsx
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   │   │   └── shadcn-components-are-here...
│   ├── server/ (trpc server)
│   │   ├── api/
│   │   │   ├── routers/
│   │   │   │   ├── auth/
│   │   │   │   |   └── auth.service.ts
│   │   │   │   ├── post/
│   │   │   │   |   ├── post.repository.ts
│   │   │   │   |   ├── post.service.ts
│   │   │   │   |   └── post.router.ts
│   │   │   │   ├── user/
│   │   │   │   |   ├── user.repository.ts
│   │   │   │   |   ├── user.service.ts
│   │   │   │   |   └── user.router.ts
│   │   │   │   └── your-trpc-route/
│   │   │   ├── root.ts
│   │   │   └── trpc.ts
│   │   ├── common/ (utils for your trpc service or repository)
│   │   │   └── base-repository.ts
│   │   ├── auth.ts
│   │   ├── db.ts
│   ├── trpc/ (trpc client setup)
│   │   ├── react.tsx (tRPC provider that consumes the shared query-client.ts)
│   │   ├── server.ts (tRPC caller for server-side usage)
│   │   └── query-client.ts (shared query client for http requests to nextjs /api/trpc)
│   └── env.js (@t3-oss/env-nextjs. please open .env.example for more details)
├── drizzle/
│   └── generated-sql-file
├── public/
│   └── favicon.ico
├── drizzle.config.ts
├── .env.example
├── .eslintrc.json
├── .gitignore
├── docker-compose.yml
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.cjs
├── prettier.config.cjs
├── README.md
├── start-database.sh
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/dodycode/nextjs-trpc-boilerplate.git
   cd nextjs-trpc-boilerplate
   ```

2. Install dependencies:
   Using pnpm (recommended):

   ```
   pnpm install
   ```

   Or using npm:

   ```
   npm install
   ```

3. Set up your environment variables:

   - Copy `.env.example` to `.env`
   - Update the necessary variables in `.env`

4. Set up the database:
   First, start the database container:

   ```
   ./start-database.sh
   ```

   Then, generate the database schema:
   Using pnpm:

   ```
   pnpm db:generate
   ```

   Or using npm:

   ```
   npm run db:generate
   ```

   Now, create the initial migration and apply it:
   Using pnpm:

   ```
   pnpm db:migrate
   ```

   Or using npm:

   ```
   npm run db:migrate
   ```

5. Start the development server:
   Using pnpm:
   ```
   pnpm dev
   ```
   Or using npm:
   ```
   npm run dev
   ```

The server should now be running on `http://localhost:3000`.

## Database Management

This project uses Drizzle ORM for database management. Here are the available scripts and when to use them:

Using pnpm:

- `pnpm db:generate`: Generate Drizzle migration files (run this after making changes to your schema)
- `pnpm db:migrate`: Run Drizzle migrations (use this for the initial setup and when you want to apply migrations)
- `pnpm db:push`: Push schema changes to the database (use this during development to quickly apply schema changes)
- `pnpm db:studio`: Open Drizzle Studio for database management

Using npm:

- `npm run db:generate`: Generate Drizzle migration files
- `npm run db:migrate`: Run Drizzle migrations
- `npm run db:push`: Push schema changes to the database
- `npm run db:studio`: Open Drizzle Studio for database management

### Workflow for Schema Changes

1. Make changes to your schema in `/src/server/db/schema/`
2. Run `pnpm db:generate` or `npm run db:generate` to create a new migration
3. Run `pnpm db:push` or `npm run db:push` to apply the changes to your development database

For production or when you need to keep track of migrations:

1. Make changes to your schema
2. Run `pnpm db:generate` or `npm run db:generate`
3. Run `pnpm db:migrate` or `npm run db:migrate` to apply the migrations

Remember to commit the generated migration files to your version control system.

## API Structure

The project uses tRPC for API routes, with a repository pattern and service layer:

- `src/server/api/routers/your-route-name`: will contains tRPC router, repository classes for data access, service classes for business logic.

Example usage in a tRPC router:

```typescript
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { yourService } from "./yourmodel.service";

export const yourRouter = createTRPCRouter({
  getData: publicProcedure.query(async () => {
    const service = new YourService();
    return service.getData();
  }),
});
```

You can check my user and post router as reference.

## Authentication

This project uses NextAuth.js for authentication. Configure your providers in `src/server/auth.ts`.

## UI Components

The project uses shadcn UI components. You can find and customize these components in `src/components/ui/`.

## Scripts

Using pnpm:

- `pnpm dev`: Start the development server
- `pnpm build`: Build the application for production
- `pnpm start`: Start the production server
- `pnpm lint`: Run ESLint to check for code quality issues

Using npm:

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm start`: Start the production server
- `npm run lint`: Run ESLint to check for code quality issues

## Docker Database Setup

The project includes a `start-database.sh` script to set up a Docker container for the database. This script:

1. Checks for Docker Compose installation
2. Sets up environment variables from your `.env` file
3. Offers to generate a random password if you're using the default
4. Starts the database container

To use it, ensure you have Docker installed and run:

```
./start-database.sh
```

## Demo

<video src="https://github.com/user-attachments/assets/40712e19-4cc7-44ed-b408-acda1d9cf470"></video>

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
