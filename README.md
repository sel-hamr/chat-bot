# DIY Chat Bot Platform

This project lets you spin up a fully branded chatbot front end with minimal effort. It wraps the `@n8n/chat` widget inside a Next.js App Router application, manages access by checking MongoDB for valid users, and layers shadcn-inspired styling on top so conversations feel polished out of the box. Bring your own n8n workflow, point the UI at its webhook, and share the resulting link to let teammates or customers chat immediately.

## Features

- Embed the `@n8n/chat` widget in fullscreen mode
- Shadcn-inspired styling for header, messages, input, and typing indicator
- MongoDB-backed user validation through a server action
- Configurable initial greetings and webhook targets via environment variables
- Graceful “User not found” fallback with retry
- Dark-mode friendly theme tokens and Tailwind utilities

## Quick Start

```bash
pnpm install
pnpm dev
# visit http://localhost:3000/chatbot/<WEBHOOK_SECRET_KEY>?userId=<valid-user>
```

## Environment Setup

Create `.env.local`:

```bash
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster-host>/?retryWrites=true&w=majority
MONGODB_DB=<database-name>
WEBHOOK_SECRET_KEY=<route-guard-secret>
NEXT_PUBLIC_CREATE_CHATBOT_WEBHOOK_URL=https://your-n8n-domain/webhook
```

## Project Structure

```
src/
  actions/check-user.ts      // Server action verifying user IDs in Mongo
  app/chatbot/[slug]/page.tsx// Guards route, renders ChatBox or fallback
  components/chat.tsx        // Initializes @n8n/chat with config
  components/hero.tsx        // Landing page hero section
  components/user-not-found.tsx // Shadcn-style error panel
  app/globals.css            // Theme tokens + n8n chat overrides

  lib/mongo.ts               // Cached MongoDB client helper
```

## Usage

1. Ensure a `users` collection exists (ObjectId `_id` or `userId` string).
2. Share the link `https://your-host/chatbot/<WEBHOOK_SECRET_KEY>?userId=<id>`.
3. n8n handles conversation logic; this UI delivers a polished shell.

## Troubleshooting

| Issue            | Resolution                                                 |
| ---------------- | ---------------------------------------------------------- |
| 404 page         | Check `WEBHOOK_SECRET_KEY` matches the slug segment        |
| “User not found” | Confirm `userId` exists in MongoDB `users` collection      |
| Styling missing  | Verify `.n8n-chat` container renders and globals.css loads |

## Deployment

- Deploy on Vercel or similar (Node.js runtime).
- Add the same env vars to the hosting dashboard.
- Allow the hosting IP in MongoDB network rules.

## License

MIT (adjust as needed).
