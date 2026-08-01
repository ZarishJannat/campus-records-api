# Campus Record API

A production-quality REST API for managing student records, built with Node.js, Express, MongoDB, and Mongoose following MVC architecture and industry best practices.

## 🚀 Project Overview

This Campus Record API provides a complete backend solution for managing student information with comprehensive validation, error handling, and advanced features like search, filtering, sorting, and pagination.

## 🛠 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **express-validator** - Request validation
- **nodemon** - Development tool (auto-restart)

## 📋 Features

- ✅ Complete CRUD operations for students
- ✅ Comprehensive data validation
- ✅ Centralized error handling
- ✅ Search by student name
- ✅ Filter by department and semester
- ✅ Sort by any field
- ✅ Pagination support
- ✅ RESTful API design
- ✅ MVC architecture
- ✅ Environment variable configuration
- ✅ Consistent JSON response format

## 📁 Project Structure

```
student-management-api/
│── config/
│     database.js           # MongoDB connection configuration
│
│── controllers/
│     studentController.js  # Business logic for student operations
│
│── middleware/
│     errorMiddleware.js    # Centralized error handling
│     notFoundMiddleware.js # 404 handler
│
│── models/
│     Student.js            # Mongoose schema with validation
│
│── routes/
│     studentRoutes.js      # API route definitions
│
│── utils/                  # Utility functions (empty for now)
│
│── .env                    # Environment variables
│── .gitignore              # Git ignore rules
│── app.js                  # Express app configuration
│── server.js               # Server entry point
│── package.json            # Dependencies and scripts
│── README.md               # Project documentation
```

## 🔧 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-record-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/campus-record
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For Windows
   net start MongoDB

   # For macOS/Linux
   sudo systemctl start mongod
   # or
   mongod
   ```

5. **Run the application**
   
   Development mode (with auto-restart):
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

   The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api/students
```

### 1. Get All Students

**Endpoint:** `GET /api/students`

**Query Parameters:**
- `name` - Search by name (case-insensitive)
- `department` - Filter by department
- `semester` - Filter by semester (1-8)
- `sort` - Sort by field (e.g., `cgpa`, `name`)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example Requests:**
```bash
# Get all students
GET /api/students

# Search by name
GET /api/students?name=Ali

# Filter by department
GET /api/students?department=Computer%20Science

# Filter by semester
GET /api/students?semester=7

# Sort by CGPA
GET /api/students?sort=cgpa

# Pagination
GET /api/students?page=1&limit=10

# Combined filters
GET /api/students?department=Computer%20Science&semester=7&sort=cgpa&page=1&limit=5
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Students retrieved successfully",
  "data": [
    {
      "_id": "65a7b8c9d0e1f2a3b4c5d6e7",
      "name": "Ali Raza",
      "rollNumber": "2023-CS-101",
      "department": "Computer Science",
      "semester": 7,
      "email": "ali@gmail.com",
      "phone": "03001234567",
      "cgpa": 3.71,
      "gender": "Male",
      "age": 22,
      "address": "Lahore",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

### 2. Get Student by ID

**Endpoint:** `GET /api/students/:id`

**Example Request:**
```bash
GET /api/students/65a7b8c9d0e1f2a3b4c5d6e7
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student retrieved successfully",
  "data": {
    "_id": "65a7b8c9d0e1f2a3b4c5d6e7",
    "name": "Ali Raza",
    "rollNumber": "2023-CS-101",
    "department": "Computer Science",
    "semester": 7,
    "email": "ali@gmail.com",
    "phone": "03001234567",
    "cgpa": 3.71,
    "gender": "Male",
    "age": 22,
    "address": "Lahore",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Student not found"
}
```

### 3. Create Student

**Endpoint:** `POST /api/students`

**Request Body:**
```json
{
  "name": "Ali Raza",
  "rollNumber": "2023-CS-101",
  "department": "Computer Science",
  "semester": 7,
  "email": "ali@gmail.com",
  "phone": "03001234567",
  "cgpa": 3.71,
  "gender": "Male",
  "age": 22,
  "address": "Lahore"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "_id": "65a7b8c9d0e1f2a3b4c5d6e7",
    "name": "Ali Raza",
    "rollNumber": "2023-CS-101",
    "department": "Computer Science",
    "semester": 7,
    "email": "ali@gmail.com",
    "phone": "03001234567",
    "cgpa": 3.71,
    "gender": "Male",
    "age": 22,
    "address": "Lahore",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Validation Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error message",
  "errors": ["Name must be at least 3 characters long"]
}
```

### 4. Update Student

**Endpoint:** `PUT /api/students/:id`

**Request Body:**
```json
{
  "semester": 8,
  "cgpa": 3.85
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "_id": "65a7b8c9d0e1f2a3b4c5d6e7",
    "name": "Ali Raza",
    "rollNumber": "2023-CS-101",
    "department": "Computer Science",
    "semester": 8,
    "email": "ali@gmail.com",
    "phone": "03001234567",
    "cgpa": 3.85,
    "gender": "Male",
    "age": 22,
    "address": "Lahore",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

### 5. Delete Student

**Endpoint:** `DELETE /api/students/:id`

**Example Request:**
```bash
DELETE /api/students/65a7b8c9d0e1f2a3b4c5d6e7
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

## 🔐 Validation Rules

### Field Validations

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | String | Yes | Min 3 characters |
| rollNumber | String | Yes | Unique |
| department | String | Yes | - |
| semester | Number | Yes | 1-8 |
| email | String | Yes | Valid email, Unique |
| phone | String | Yes | Pakistan format (03XXXXXXXXX) |
| cgpa | Number | Yes | 0-4 |
| gender | String | Yes | Male/Female/Other |
| age | Number | Yes | 16-35 |
| address | String | Yes | - |

### Error Response Format

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

### HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Validation error or invalid request
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 🧪 Sample Requests

### Create Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ali Raza",
    "rollNumber": "2023-CS-101",
    "department": "Computer Science",
    "semester": 7,
    "email": "ali@gmail.com",
    "phone": "03001234567",
    "cgpa": 3.71,
    "gender": "Male",
    "age": 22,
    "address": "Lahore"
  }'
```

### Get All Students
```bash
curl http://localhost:5000/api/students
```

### Get Student by ID
```bash
curl http://localhost:5000/api/students/65a7b8c9d0e1f2a3b4c5d6e7
```

### Update Student
```bash
curl -X PUT http://localhost:5000/api/students/65a7b8c9d0e1f2a3b4c5d6e7 \
  -H "Content-Type: application/json" \
  -d '{
    "semester": 8,
    "cgpa": 3.85
  }'
```

### Delete Student
```bash
curl -X DELETE http://localhost:5000/api/students/65a7b8c9d0e1f2a3b4c5d6e7
```

## 📝 Demo Flow

1. **Start the server**
   ```bash
   npm run dev
   ```

2. **GET all students** (should return empty array initially)
   ```bash
   GET /api/students
   ```

3. **POST a new student**
   ```bash
   POST /api/students
   {
     "name": "Ali Raza",
     "rollNumber": "2023-CS-101",
     "department": "Computer Science",
     "semester": 7,
     "email": "ali@gmail.com",
     "phone": "03001234567",
     "cgpa": 3.71,
     "gender": "Male",
     "age": 22,
     "address": "Lahore"
   }
   ```

4. **GET all students again** (should return the created student)
   ```bash
   GET /api/students
   ```

5. **GET student by ID**
   ```bash
   GET /api/students/{id}
   ```

6. **UPDATE student semester**
   ```bash
   PUT /api/students/{id}
   {
     "semester": 8
   }
   ```

7. **GET updated student**
   ```bash
   GET /api/students/{id}
   ```

8. **DELETE student**
   ```bash
   DELETE /api/students/{id}
   ```

9. **GET all students after deletion** (should return empty array)
   ```bash
   GET /api/students
   ```

10. **Send invalid POST request** (to demonstrate validation)
    ```bash
    POST /api/students
    {
      "name": "AB",
      "email": "invalid-email"
    }
    ```

## 🚀 Future Improvements

- [ ] Authentication and authorization
- [ ] Role-based access control (admin, teacher, student)
- [ ] Course management
- [ ] Grade management
- [ ] Attendance tracking
- [ ] File upload for student documents
- [ ] Email notifications
- [ ] Data export (CSV, PDF)
- [ ] Advanced search with multiple criteria
- [ ] Caching with Redis
- [ ] Rate limiting
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built as an internship project demonstrating production-quality Node.js API development.

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using Node.js, Express, and MongoDB**
