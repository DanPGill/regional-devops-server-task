# Welcome to Dan's DevOps Server & Client!

# Stack

This project was built using Vite, scaffolded with `react-ts` as per https://vite.dev/guide/#scaffolding-your-first-vite-project for the client and https://github.com/szymmis/vite-express for the server.

It implements the following:

- TypeScript
- React
- Express JS
- ShadCN for UI components
- Tailwindcss for styling
- Docker and flyctl for deployment

# Instructions

- Install with `pnpm i`
- Run with `pnpm run dev`

# Limitations

- This project is not a true monorepo produced with a tool like nx for the sake of time/simplicity
- Backend doesn't have lint/prettier to save time - see frontend for how this would be implemented
- More test coverage would be preferable but given time constraints I've added a basic suite to establish a standard
