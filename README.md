# Todo App

This is a simple Todo application built using Node.js, Express, and MongoDB. It supports basic CRUD operations to manage todo items.

## Features

- Create a new todo
- Retrieve all todos
- Retrieve a specific todo by ID
- Update a todo
- Delete a todo

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js
- MongoDB (or a MongoDB Atlas account)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/todo-app.git
    ```

2. Navigate to the project directory:

    ```sh
    cd todo-app
    ```

3. Install the dependencies:

    ```sh
    npm install
    ```

4. Set up your MongoDB URI. Replace `<username>` and `<password>` with your MongoDB Atlas username and password in the `initializeDBAndServer` function within the `index.js` file:

    ```js
    const username = encodeURIComponent("your-username");
    const password = encodeURIComponent("your-password");
    const uri = `mongodb+srv://${username}:${password}@cluster0.ui5whmx.mongodb.net/`;
    ```

5. Start the server:

    ```sh
    node index.js
    ```

6. Your server should now be running on `http://localhost:3000`.

## API Endpoints

### Create a new todo

- **URL:** `/todos`
- **Method:** `POST`
- **Body Parameters:**
  - `title` (string)
  - `description` (string)
- **Response:**
  - `201 Created` on success
  - `500 Internal Server Error` on failure

### Retrieve all todos

- **URL:** `/todos`
- **Method:** `GET`
- **Response:**
  - `200 OK` on success
  - `500 Internal Server Error` on failure

### Retrieve a specific todo by ID

- **URL:** `/todos/:userId`
- **Method:** `GET`
- **Response:**
  - `200 OK` on success
  - `500 Internal Server Error` on failure

### Update a todo

- **URL:** `/todos/:todoId`
- **Method:** `PUT`
- **Body Parameters:**
  - `title` (string)
  - `description` (string)
- **Response:**
  - `200 OK` on success
  - `500 Internal Server Error` on failure

### Delete a todo

- **URL:** `/todos/:todoId`
- **Method:** `DELETE`
- **Response:**
  - `200 OK` on success
  - `500 Internal Server Error` on failure

## Error Handling

All endpoints return appropriate HTTP status codes and error messages when something goes wrong. Ensure you handle these responses correctly in your client application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

