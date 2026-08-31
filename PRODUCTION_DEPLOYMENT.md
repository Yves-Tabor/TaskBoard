# Production Deployment Guide

## Overview
TaskBoard has been fully migrated from a mock server to a production-ready backend architecture using MongoDB and NestJS.

## What Changed

### Removed
- ✅ Mock server (`mockServer.ts`) - completely removed
- ✅ In-memory data storage

### Added
- ✅ MongoDB integration for persistent data storage
- ✅ Projects module with full CRUD operations
- ✅ Mongoose schemas for Users and Projects
- ✅ User authentication with JWT tokens
- ✅ Full task management API endpoints

## Backend Setup

### Environment Variables
Create a `.env` file in the backend directory with:

```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/?appName=TaskBoard
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=production
PORT=3000
```

### Database Requirements
- MongoDB 4.4+ (local or Atlas)
- Connection string with proper credentials

### Building & Running

**Development:**
```bash
cd backend
pnpm install
pnpm run start:dev
```

**Production:**
```bash
cd backend
pnpm install
pnpm run build
pnpm run start:prod
```

## Frontend Setup

### Environment Variables
The frontend uses environment-specific configuration:

- `.env.development`: Points to `http://localhost:3000`
- `.env.production`: Points to your production API URL

Update `.env.production` with your actual API endpoint:
```
VITE_API_BASE_URL=https://your-api-domain.com
```

### Building & Running

**Development:**
```bash
cd frontend
pnpm install
pnpm run dev
```

**Production Build:**
```bash
cd frontend
pnpm install
pnpm run build
```

The optimized production build will be in `frontend/dist/`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile (requires JWT)

### Projects (All require JWT authentication)
- `GET /projects` - List all user projects
- `POST /projects` - Create new project
- `GET /projects/:id` - Get specific project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Tasks (All require JWT authentication)
- `POST /projects/:id/tasks` - Add task to project
- `PUT /projects/:id/tasks/:taskId` - Update task
- `DELETE /projects/:id/tasks/:taskId` - Delete task

## Deployment Checklist

- [ ] Ensure MongoDB is accessible from your server
- [ ] Set secure `JWT_SECRET` environment variable
- [ ] Build backend: `pnpm run build`
- [ ] Build frontend: `pnpm run build`
- [ ] Deploy backend to your server/container
- [ ] Deploy frontend dist/ files to static hosting (or same server)
- [ ] Update frontend `.env.production` with correct API URL
- [ ] Test all authentication endpoints
- [ ] Test project CRUD operations
- [ ] Test task CRUD operations
- [ ] Enable HTTPS in production
- [ ] Set up CORS properly for production domain
- [ ] Monitor error logs and API performance

## Hosting Options

### Backend
- Railway.app
- Render.com
- AWS EC2/ECS
- Azure App Service
- DigitalOcean
- Heroku (with buildpack)

### Frontend
- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps
- GitHub Pages (if backend allows CORS)

### Database
- MongoDB Atlas (recommended)
- AWS DocumentDB
- Azure Cosmos DB

## Security Notes

1. **JWT Secret**: Use a strong, random secret. Never commit `.env` files
2. **CORS**: Configure CORS properly to only allow your frontend domain
3. **HTTPS**: Always use HTTPS in production
4. **Database**: Enable authentication, use VPC/security groups
5. **Rate Limiting**: Consider adding rate limiting to API endpoints
6. **Input Validation**: All endpoints validate input data
7. **Password Hashing**: Passwords are hashed with bcrypt (10 rounds)

## Troubleshooting

### MongoDB Connection Issues
- Verify connection string format
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are correct
- Test connection with MongoDB compass

### Frontend API Calls Failing
- Check CORS headers are being sent by backend
- Verify `VITE_API_BASE_URL` is correct
- Check network tab in browser dev tools
- Ensure backend is running and accessible

### JWT Authentication Errors
- Verify `JWT_SECRET` matches between runs
- Check token expiration (default: 1 day)
- Ensure Authorization header is sent correctly
- Check JwtAuthGuard is properly applied

## Performance Considerations

- Frontend build is ~84KB gzipped (React + UI + API client)
- Implement pagination for large project lists
- Consider adding caching for projects list
- Monitor MongoDB query performance
- Enable compression on backend (already configured in NestJS)

---

For questions or issues, refer to the main README.md
