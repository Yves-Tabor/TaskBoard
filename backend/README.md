# TaskBoard backend

This is the NestJS API for the TaskBoard application.

## Local development

```bash
npm install
npm run start:dev
```

## Production build

```bash
npm install --include=dev
npm run build
npm run start:prod
```

## Environment

Set the following environment variables in Render:

- PORT
- JWT_SECRET
- FRONTEND_URL

The service is designed to run as a Render web service.
