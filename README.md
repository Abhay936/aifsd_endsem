# AI Smart Complaint Management System

A production-ready full-stack MERN application for managing complaints with AI integration for automatic urgency detection, department routing, and summarization.

## Features
- **User Authentication**: Secure JWT-based login and signup.
- **AI Integration**: Powered by Google Gemini (via OpenRouter) to automatically analyze complaints.
- **Smart Routing**: Auto-detects the priority and routes complaints to the responsible department.
- **Dashboard**: Real-time statistics of complaints.
- **Responsive UI**: Built with Tailwind CSS and Vite for a modern, fast experience.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Axios, React Router, Context API
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs, OpenAI SDK
- **AI**: Gemini 2.5 Flash via OpenRouter

## Installation Steps

1. **Clone & Install Backend**
   ```bash
   cd backend
   npm install
   ```
2. **Install Frontend**
   ```bash
   cd frontend
   npm install
   ```

## Environment Variables

**Backend (`backend/.env`)**
```env
MONGO_URI=your_mongodb_cluster_url
PORT=5000
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally
1. Start Backend: `cd backend && npm start` (or `node server.js`)
2. Start Frontend: `cd frontend && npm run dev`

## API Endpoints
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Authenticate user
- `POST /api/complaints` - Create a complaint (triggers AI)
- `GET /api/complaints` - List complaints (supports `?location=` & `?category=`)
- `GET /api/complaints/:id` - Get complaint details
- `PUT /api/complaints/:id` - Update status
- `DELETE /api/complaints/:id` - Delete complaint

## Deployment (Render)
This project includes a `render.yaml` file for easy deployment as an Infrastructure as Code (IaC) blueprint.
1. Connect this repo to Render.
2. Render will automatically detect the backend and frontend configurations.
3. Fill in the missing Environment Variables (`MONGO_URI`, `JWT_SECRET`, `OPENAI_API_KEY`) in the Render dashboard.

## Live URLs
- **Frontend Live URL**: `[Placeholder: Add Render Frontend URL]`
- **Backend Live URL**: `[Placeholder: Add Render Backend URL]`

## Screenshots
- **Home Page**: `[Placeholder: Image]`
- **Dashboard**: `[Placeholder: Image]`
- **AI Analysis Result**: `[Placeholder: Image]`
