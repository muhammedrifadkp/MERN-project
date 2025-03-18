# TSEEP Academy - MERN Stack Educational Platform

This project is a MERN stack educational platform developed as part of the Texol World Machine Test. It includes user authentication, course management, and a responsive UI using Tailwind CSS.

##  Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **State Management**: useState, useEffect
- **API Client**: Axios

---

##  Features

### Authentication System
- User registration with form validation
- Login functionality with validation
- Password encryption using bcrypt
- JWT token-based authentication

### Course Management
- Display a course catalog with search options
- Display at least 5 courses per page
- Allow users to add/remove courses from their profile
- Display course details including duration, instructor, and difficulty level
- Show ratings and student completion statistics

### UI/UX Design
- Fully responsive design for mobile, tablet, and desktop
- Dashboard with personalized greeting & key statistics
- Course listing and course detail pages
- Implemented TSEEP Academy branding with blue color scheme

---

##  Installation & Setup

### 1 Backend Setup

1. Navigate to the `back-end` folder:
   ```bash
   cd back-end
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Create a `.env` file in the `back-end` directory and add:
     ```env
     MONGO_URI=mongodb://127.0.0.1:27017/tseep_academy
JWT_SECRET=768fdb572dc8f5835cb9ed50ac29bb2eddf9942f0fe08291d7f3350cc6a9d6b94160ac8b3f785c9f30e4a9c3b25211bea99cd8021f19bcd0a719351e7512226a
PORT=5000
     ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 2 Frontend Setup

1. Navigate to the `front-end` folder:
   ```bash
   cd front-end
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

##  API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint    | Description                     |
|--------|-------------|---------------------------------|
| POST   | `/register` | Register a new user             |
| POST   | `/login`    | Authenticate user & return JWT  |

### User Routes (`/api/user`)
| Method | Endpoint    | Description                     |
|--------|-------------|---------------------------------|
| GET    | `/profile`  | Get user profile data           |

### Course Routes (`/api/courses`)
| Method | Endpoint        | Description                      |
|--------|-----------------|----------------------------------|
| GET    | `/`             | Get all courses                  |
| GET    | `/:id`          | Get course details               |
| POST   | `/add-course`   | Add a new course to MongoDB      |
| DELETE | `/:id`          | Remove a course                  |

---

##  Deployment (Optional)
If time permits, deploy the backend using **Render/Vercel** and the frontend using **Netlify/Vercel**.

---

##  Evaluation Criteria
- ✅ Code quality and organization
- ✅ UI/UX design and responsiveness
- ✅ Authentication security
- ✅ Error handling and validation
- ✅ Database design

---

###  Developed as part of Texol World Machine Test