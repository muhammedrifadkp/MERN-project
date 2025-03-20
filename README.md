# TSEEP Academy - MERN Stack Educational Platform

This project is a MERN stack educational platform developed as part of the Texol World Machine Test. It includes user authentication, course management, and a responsive UI using Tailwind CSS.

---

## 🚀 Features

### **Authentication System**
- User registration with form validation.
- Login functionality with validation.
- Password encryption using bcrypt.
- JWT token-based authentication.

### **Course Management**
- Display a course catalog with search options.
- Display at least 5 courses per page.
- Allow users to add/remove courses from their profile.
- Display course details including duration, instructor, and difficulty level.
- Show ratings and student completion statistics.

### **UI/UX Design**
- Fully responsive design for mobile, tablet, and desktop.
- Dashboard with personalized greeting and key statistics.
- Course listing and course detail pages.
- Implemented TSEEP Academy branding with a blue color scheme.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **State Management**: React Hooks (`useState`, `useEffect`)
- **API Client**: Axios

---

## 📸 Screenshots

### **Registration Page**
![Registration Page](https://raw.githubusercontent.com/muhammedrifadkp/MERN-project/main/front-end/public/screenshots/register.PNG)

### **Login Page**
![Login Page](https://raw.githubusercontent.com/muhammedrifadkp/MERN-project/main/front-end/public/screenshots/Login.PNG)

### **Dashboard**
![Dashboard](https://raw.githubusercontent.com/muhammedrifadkp/MERN-project/main/front-end/public/screenshots/dashboard.PNG)

### **Courses**
![Dashboard](https://raw.githubusercontent.com/muhammedrifadkp/MERN-project/main/front-end/public/screenshots/courses.PNG)

### **My Courses**
![Dashboard](https://raw.githubusercontent.com/muhammedrifadkp/MERN-project/main/front-end/public/screenshots/myCourses.PNG)

---

## 🛠️ Installation & Setup

### **1. Backend Setup**

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
     MONGO_URI=your-mongodb-uri
     
JWT_SECRET=your-jwt-secret

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

##  Evaluation Criteria
- ✅ Code quality and organization
- ✅ UI/UX design and responsiveness
- ✅ Authentication security
- ✅ Error handling and validation
- ✅ Database design

---

###  Developed as part of Texol World Machine Test