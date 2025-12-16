## Project Structure

- [`packages/ema`](/packages/ema): The core for the EverMindAgent.
- [`packages/ema-ui`](/packages/ema-ui): The application for the EverMindAgent.

## Development

Both the core and UI packages are developed using TypeScript.

- All of the public classes, methods, and variables should be documented with JSDoc.
- Write tests (vitest) in the `**/*.spec.ts` files.
- Format the code using `pnpm format` (Prettier).

### Core Development

The core package focuses on providing the core functionality for the EverMindAgent frontend. It implements REST APIs for the frontend to interact with.

The core functionality includes:

- Implements the agent that chats with the user.
- Provides server endpoints by the class `Server` in [`packages/ema/src/server.ts`](/packages/ema/src/server.ts).

### Application Development

The application package focuses on providing a web-based GUI for the EverMindAgent framework. It is a Next.js application that can be started by running `pnpm start`.

- The server endpoints are exposed as REST APIs in the [`api`](/packages/ema-ui/src/app/api) folder.
