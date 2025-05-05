# ToDo App Backend

A backend-only Node.js + Express REST API for a simple To-Do application, which I created for a purpose of familiarizing with Express, Mongoose, and JWT. This project demonstrates:

-   Setting up secure **user authentication** using **JWT**
-   Protecting routes to allow users access to **only their own tasks**
-   Storing user and task data in **MongoDB** using **Mongoose**

---

## 📦 Prerequisites

Before running this project, ensure you have:

-   [Node.js](https://nodejs.org/) (v14+ recommended)
-   [MongoDB](https://www.mongodb.com/) (local or Atlas cloud database)
-   [Postman](https://www.postman.com/) (or similar tool for testing API)

---

## ⚙️ Installation & Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/edwardisintou/Todo-App-Backend.git
    cd Todo-App-Backend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure environment variables**

    Rename `.envexample` to `.env` and replace with your `MONGO_URI` value

4. **Run the server**

    ```bash
    npm run dev
    ```

    The API will run at http://localhost:8000 by default.

    If successful, you should see these 2 lines: `Server running on port 8000` and `MongoDB Connected: ...`

## 🧪 Testing API with Postman

### Step-by-step Workflow:

1. **Register a new user**

    - URL: POST http://localhost:8000/api/users/
    - Body (raw JSON):

    ```json
    {
        "name": "Jane Doe",
        "email": "jane@gmail.com",
        "password": "jane"
    }
    ```

2. **Login to get your JWT token**

    - URL: POST http://localhost:8000/api/users/login
    - Body (raw JSON):

    ```json
    {
        "email": "jane@gmail.com",
        "password": "jane"
    }
    ```

    - Response example:

    ```json
    {
        "_id": "1",
        "name": "Jane Doe",
        "email": "jane@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
    }
    ```

3. **Save the token from the response. This is your JWT for all protected task routes.**

4. **Apply the token in Postman**

    - Go to the **Authorization** tab of your request
    - Choose `Bearer Token`
    - Paste your token (e.g., `eyJhbGciOiJIUzI1NiIsInR5cCI...`)

### API Endpoints

1. **User Authentication**

    | Method | Route              | Description                 | Body Params                 | Auth Required |
    | ------ | ------------------ | --------------------------- | --------------------------- | ------------- |
    | POST   | `/api/users`       | Register a new user         | `{ name, email, password }` | No            |
    | POST   | `/api/users/login` | Login and receive JWT token | `{ email, password }`       | No            |
    | GET    | `/api/users/me`    | Retrieve user information   | None                        | Yes           |

2. **Task Management**

    All task routes require the above JWT token, please include it in the **Authorization** tab

    | Method | Route            | Description            | Body Params | Auth Required |
    | ------ | ---------------- | ---------------------- | ----------- | ------------- |
    | GET    | `/api/tasks`     | Get all tasks for user | None        | Yes           |
    | POST   | `/api/tasks`     | Create a new task      | `{ title }` | Yes           |
    | PUT    | `/api/tasks/:id` | Update a task by ID    | `{ title }` | Yes           |
    | DELETE | `/api/tasks/:id` | Delete a task by ID    | None        | Yes           |

## 📌 Example Postman Workflow

1. `POST /api/users/` – Register a new user
2. `POST /api/users/login` – Login and copy the JWT
3. In your **Authorization** tab, choose `Bearer Token`, then paste your **JWT**
4. Now you can access `/api/tasks` routes or `/api/users/me` route
