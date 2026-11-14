# HireLoop Server

**Backend API for HireLoop – A Job Recruitment Platform**

HireLoop Server is the backend application for HireLoop, a job recruitment platform that connects job seekers with recruiters. It provides RESTful APIs for managing jobs, applications, companies, subscription plans, and user subscriptions.

## 🚀 Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js 5** – Backend web framework
- **MongoDB** – NoSQL database
- **MongoDB Native Driver** – Database connectivity
- **CORS** – Cross-Origin Resource Sharing
- **dotenv** – Environment variable management

## ✨ Features

- Job listing and job details retrieval
- Create and manage job postings
- Retrieve job applications
- Submit job applications
- Company information management
- Retrieve recruiter-specific company information
- Subscription plan retrieval
- User subscription management
- MongoDB database integration

## 📁 Project Structure

```text
Hireloop-server/
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/mdmuntasirfahad-del/Hireloop-server.git
```

### 2. Navigate to the project directory

```bash
cd Hireloop-server
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory.

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB connection string.

### 5. Start the server

```bash
node index.js
```

The server runs on:

```text
http://localhost:5000
```

## 🔗 API Endpoints

### Jobs API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get all jobs |
| GET | `/api/jobs/:id` | Get a job by ID |
| POST | `/api/jobs` | Create a new job |

Optional query parameters:
- `recruiterId`
- `status`

### Applications API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/application` | Get applications |
| POST | `/api/application` | Submit a job application |

Optional query parameters:
- `applicantId`
- `jobId`

### Companies API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/companies` | Get all companies |
| GET | `/api/my/companies` | Get recruiter-specific company |
| POST | `/api/companies` | Create a company |

Optional query parameter:
- `recruiterId` for `/api/my/companies`

### Subscription Plans API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/plans` | Get a subscription plan |

Optional query parameter:
- `plan_id`

### Subscriptions API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/subscriptions` | Create a subscription and update the user's plan |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check server response |

## 🗄️ Database Structure

**Database:** `hireloop_auth_db`

Collections used:

- `jobs`
- `user`
- `companies`
- `applications`
- `plans`
- `subscriptions`

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB database connection string |

## 🌐 Repository

GitHub: https://github.com/mdmuntasirfahad-del/Hireloop-server

## 👨‍💻 Author

**Md. Muntasir Fahad**

GitHub: https://github.com/mdmuntasirfahad-del

---

*HireLoop Server – Powering the HireLoop Job Recruitment Platform.*
