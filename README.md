# mediawiki-typescript

A TypeScript monorepo for MediaWiki development tools and libraries.

## Structure

This monorepo uses [Turborepo](https://turborepo.com/) to manage multiple packages and applications.

### Apps

- **mw-cli** (`@mediawiki-typescript/mw-cli`): MediaWiki command-line interface tool.

### Packages

- **api** (`@mediawiki-typescript/api`): A typed axios-based client for the MediaWiki Action API (`api.php`) and REST API (`rest.php/v1`), with pluggable auth (bot passwords, OAuth) and content that bridges to/from `builder`/`parser`.
- **builder** (`@mediawiki-typescript/builder`): A tool set for building MediaWiki content (wikitext) with TypeScript.
- **parser** (`@mediawiki-typescript/parser`): A wikitext parser that parses raw wikitext into `@mediawiki-typescript/builder` content.

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

## Releasing

This repo uses [Changesets](https://github.com/changesets/changesets) to version and publish packages to npm.

1. Run `npm run changeset` and describe your change; commit the generated `.changeset/*.md` file with your PR.
2. Merging to `main` triggers a "Version Release" PR (via `changesets/action`) that bumps versions and updates changelogs.
3. Merging that release PR publishes the updated packages to npm.

