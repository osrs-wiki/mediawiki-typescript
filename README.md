# mediawiki-typescript

A TypeScript monorepo for MediaWiki development tools and libraries.

## Structure

This monorepo uses [Turborepo](https://turborepo.com/) to manage multiple packages and applications.

### Apps

- **mw-cli**: MediaWiki command-line interface tool

### Packages

- **api**: MediaWiki API client library
- **builder**: Build tools for MediaWiki extensions
- **parser**: MediaWiki wikitext parser
- **tanstack-query**: TanStack Query integration for MediaWiki

## Getting Started

Install dependencies:

```bash
npm install
```

Build all packages:

```bash
npm run build
```

Run development mode:

```bash
npm run dev
```

## Scripts

- `npm run build` - Build all packages and apps
- `npm run dev` - Run all packages and apps in development mode
- `npm run lint` - Lint all packages and apps
- `npm run format` - Format all code with Prettier
- `npm run test` - Run tests for all packages and apps

## Technology Stack

- **Turborepo**: Monorepo build system
- **TypeScript**: Type-safe development
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **npm**: Package management
