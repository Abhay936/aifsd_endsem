# B.Tech 4th Semester Examination Report
## Subject: AI Driven Full Stack Development
### Project Title: AI-Based Smart Complaint Management System

---

## 1. Project Overview
The "AI Smart Complaint Management System" is a full-stack MERN application designed to streamline the handling of complaints. It integrates Artificial Intelligence (via Google Gemini/OpenRouter) to automatically analyze submitted complaints, detect their priority/urgency, recommend the most suitable department for resolution, and generate a concise summary and automated response. This drastically reduces manual triage time and improves response efficiency.

## 2. Architecture Explanation
The application follows a standard **MVC (Model-View-Controller)** architecture wrapped in a MERN stack environment:

- **Frontend (Client Layer)**: Built with React.js, Vite, and Tailwind CSS. It handles the UI, routing (React Router DOM), and state management (Context API). It communicates with the backend via Axios REST API calls.
- **Backend (Server Layer)**: Built with Node.js and Express.js. It handles business logic, security (JWT, bcryptjs), and routing.
- **Database (Data Layer)**: MongoDB Atlas (NoSQL) accessed via Mongoose ODM for defining schemas and data interactions.
- **AI Integration (External Service Layer)**: The backend securely communicates with the OpenRouter API (using the OpenAI SDK) to send prompts to the Gemini 2.5 Flash model and receive structured JSON responses.

## 3. Folder Structure Explanation

### `frontend/`
- `src/api/` - Axios configurations and interceptors for attaching JWTs.
- `src/components/` - Reusable UI components (Navbar, ProtectedRoute).
- `src/context/` - React Context API files (AuthContext) for global state.
- `src/pages/` - Core application views (Home, Login, Dashboard, etc.).
- `src/index.css` - Tailwind CSS entry point and theme configurations.

### `backend/`
- `config/` - Database connection setup (`db.js`).
- `controllers/` - Functions that execute business logic for specific endpoints.
- `middleware/` - Custom middlewares (e.g., JWT validation via `authMiddleware.js`).
- `models/` - Mongoose schemas (`User.js`, `Complaint.js`).
- `routes/` - Express routing definitions mapping URLs to controller functions.
- `services/` - External integrations, primarily `aiService.js` for OpenRouter/Gemini API calls.

## 4. API Documentation

### Auth APIs
- `POST /api/auth/signup`: Registers a new user. Expects `{ name, email, password }`.
- `POST /api/auth/login`: Authenticates user and returns JWT. Expects `{ email, password }`.

### Complaint APIs
- `POST /api/complaints`: Creates a complaint. Automatically triggers AI analysis. Requires Bearer Token. Expects `{ title, description, category, location }`.
- `GET /api/complaints`: Fetches complaints. Supports query params `?location=X&category=Y`. Requires Bearer Token.
- `GET /api/complaints/:id`: Fetches specific complaint by ID. Requires Bearer Token.
- `PUT /api/complaints/:id`: Updates complaint (e.g., status). Requires Bearer Token.
- `DELETE /api/complaints/:id`: Deletes complaint. Requires Bearer Token.

### AI APIs
- `POST /api/ai/analyze`: Manual endpoint to trigger AI analysis without saving. Requires Bearer Token.

## 5. Postman Testing Guide
1. **Signup**: Create a POST request to `http://localhost:5000/api/auth/signup` with JSON body.
2. **Login**: Create a POST request to `http://localhost:5000/api/auth/login`. Copy the `token` from the response.
3. **Set Auth**: In Postman, go to the "Authorization" tab for subsequent requests, select "Bearer Token", and paste the token.
4. **Create Complaint**: Send POST to `http://localhost:5000/api/complaints` with complaint details.
5. **Verify AI**: Check the JSON response of the POST request to see `priority`, `department`, `aiSummary`, and `aiResponse` automatically populated.

---

## 6. MongoDB Screenshots
*(Placeholder for MongoDB Atlas screenshots showing the database clusters, collections, and sample documents)*
`[Insert MongoDB Atlas Cluster Image Here]`
`[Insert Users Collection Image Here]`
`[Insert Complaints Collection Image Here]`

## 7. Render Deployment Screenshots
*(Placeholder for Render Dashboard screenshots)*
`[Insert Render Web Service Configuration Image Here]`
`[Insert Render Environment Variables Setup Image Here]`
`[Insert Successful Deployment Logs Image Here]`

## 8. Output Screenshots
*(Placeholder for actual application screenshots)*
- **Landing Page**: `[Insert Image Here]`
- **Login/Signup Page**: `[Insert Image Here]`
- **Dashboard Overview**: `[Insert Image Here]`
- **Complaint Submission Form**: `[Insert Image Here]`
- **AI Analysis Results (Complaint Details)**: `[Insert Image Here]`
