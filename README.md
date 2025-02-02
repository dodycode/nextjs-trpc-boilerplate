# Next JS Boilerplate with tRPC + Repository Design Pattern

A customized version of the [T3 Stack App](https://create.t3.gg/) that I use in my daily work.

Feel free to fork and customize it to suit your needs.

## Features

- **Next.js 15**: Next 15 with Server Actions & React 19
- **TypeScript**: For type-safe JavaScript development
- **tRPC**: End-to-end typesafe APIs
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **Auth.JS (formerly known as NextAuth.js)**: Authentication for Next.js
- **Zod**: Runtime type checking and validation
- **shadcn/ui**: Beautifully designed components built with Radix UI and Tailwind v4!
- **Repository Pattern**: For clean separation of data access logic
- **Service Layer**: Business logic abstraction
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: For identifying and fixing code quality issues
- **Prettier**: For consistent code formatting

## Project Structure

![trpc-nextjs](https://github.com/user-attachments/assets/51542592-adc5-422a-a465-d824f529500d)

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

This project uses Auth.js for authentication. Configure your providers in `src/server/auth/config.ts`.

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

## Preview

- Auth Pages
  ![Image](https://github.com/user-attachments/assets/acb4176e-aa65-4d23-be27-e0603197224a)

- Protected Pages
  ![Image](https://github.com/user-attachments/assets/14bfdfa5-f70b-461b-aa20-c1aeabec5d49)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
