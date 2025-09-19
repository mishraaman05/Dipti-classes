# 📚 Dipti Intermediare Classes Website

Welcome to the Dipti Intermediare Classes Website repository! This project is a fully responsive, interactive, and user-friendly web application designed to provide information about courses, faculty, contact details, and allow students to sign up, log in, and enroll in demo classes. It is built using modern web technologies and follows best practices for UI/UX and backend integration.

# ✅ Features
## 🌐 Frontend

Fully responsive design for desktops, tablets, and mobile devices.

Attractive UI with smooth animations and hover effects.

Navigation bar with dynamic links and logout functionality.

Course listing with offer price, discount calculation, and percentage tags.

Resource section with expandable content sections.

Contact form with validation.

Demo class enrollment form.

Login and signup forms with error handling.

Integration with external APIs where required.

## 🔧 Backend

RESTful API built with Node.js and Express.js.

MongoDB for storing user data, contact queries, and enrollments.

Secure user authentication with password hashing.

Session management for login/logout.

CRUD operations for courses, users, and other data.

Redirection to the homepage after successful login.

Logout functionality with success message handling.

# 📂 Folder Structure
dipti-intermediare-classes/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── server.js
├── frontend/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── contact.html
│   ├── demo-class.html
├── .env
├── README.md
├── package.json

# 🚀 Technologies Used
## Frontend

HTML5, CSS3, JavaScript (ES6+)

Bootstrap / Tailwind CSS (optional)

AJAX / Fetch API for API communication

Responsive design principles

## Backend

Node.js

Express.js

MongoDB (with Mongoose ORM)

bcrypt for password encryption

express-session for session management

dotenv for environment variable handling

# 📥 Installation
## Prerequisites

Node.js installed

MongoDB database setup (local or cloud)

Git installed

# Steps

1. Clone the repository

git clone https://github.com/yourusername/dipti-intermediare-classes.git
cd dipti-intermediare-classes


2. Install backend dependencies

cd backend
npm install


3. Setup environment variables
Create a .env file in the backend folder and add:

MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=5000


4. Run the backend server

node server.js


5. Open the frontend
Open frontend/index.html in your browser or serve it with Live Server.

# 📄 API Endpoints (Sample)
## Auth Routes

POST /api/auth/signup – Register a new student

POST /api/auth/login – Login student

GET /api/auth/logout – Logout student

## Courses

GET /api/courses – Fetch all courses

POST /api/courses – Add new course (admin only)

## Contact

POST /api/contact – Submit a contact message

## Demo Enrollment

POST /api/enroll – Enroll in a demo class

## ✅ Usage

1. Navigate to the homepage of Dipti Intermediare Classes.

2. Explore courses, faculty details, and other sections.

3. Sign up or log in using your credentials.

4. Enroll in demo classes and contact the institute for queries.

5. Logout once you're done.

## 🛠 Development Guidelines

Keep environment variables secret and never commit them.

Follow RESTful design principles for the backend.

Validate user inputs both on client and server side.

Use HTTPS in production.

Optimize images and assets for faster loading.

Write modular and reusable code for scalability.

# 📂 Future Enhancements

Add payment gateway integration for course enrollments.

Implement email notifications for signup and demo enrollment.

Add an admin panel for managing courses and users.

Enhance accessibility for better user experience.

Deploy on cloud platforms like Heroku, AWS, or DigitalOcean.

# 🤝 Contribution

Contributions to Dipti Intermediare Classes Website are welcome! Please fork the repository and create a pull request with improvements or bug fixes.

Fork the project

Create your feature branch: git checkout -b feature-name

Commit your changes: git commit -m 'Add feature'

Push to the branch: git push origin feature-name

Open a pull request

# 📜 License

This project is open-source and available under the MIT License.

# 📧 Contact

For any inquiries or issues, please contact:

Aman Mishra
📧 mishraaman16202@gmail.com

📞 +91-7654946557
