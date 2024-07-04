const express = require('express');
const { ObjectId, MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const dotenv = require('dotenv');
dotenv.config(); 


app.use(express.json());
app.use(cors());



let client;
const initializeDBAndServer = async () => {
    // Replace 'username' and 'password' with your MongoDB Atlas username and password
    const username = encodeURIComponent(process.env.MONGODB_USERNAME);
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD);

    // Replace this URI with your Node JS MongoDB connection URI obtained from MongoDB Atlas
    const uri = `mongodb+srv://${username}:${password}@cluster0.ui5whmx.mongodb.net/`;


    client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB.....");
        app.listen(3000, () => {
            console.log('Server running on port: 3000');
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

initializeDBAndServer();



// Endpoint to create a new todo
app.post('/todos', async (request, response) => {
    try {
        const collection = client.db('todo-app').collection('todos');
        const { title, description } = request.body;
        const newTodo = {
            title,
            description,
            // userId: request.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const result = await collection.insertOne(newTodo);
        response.status(201).send({ todoId: result.insertedId, message: 'Todo created successfully' });
    } catch (error) {
        response.status(500).send({ "Internal server error:": error });
    }
});

// Endpoint to get all todos
app.get('/todos',  async (request, response) => {
    try {
        const collection = client.db('todo-app').collection('todos');
        const todos = await collection.find({ userId: request.userId }).toArray();
        response.status(200).send(todos);
    } catch (error) {
        response.status(500).send({ "Internal server error:": error });
    }
});

//Endpoint to get todos by id
app.get('/todos/:userId', async (request, response) => {
      try {
          
          const collection = client.db('todo-app').collection('todos'); 
          const { userId } = request.params;
          const result = await collection.findOne(new ObjectId(userId));
          response.status(200)
          response.send({ title: result.title , description: result.description});
         
      } catch (error) {
          response.status(500)
          response.send({ "Internal server error:": error });
      }
    });


// Endpoint to update a todo
app.put('/todos/:todoId', async (request, response) => {
    try {
        const collection = client.db('todo-app').collection('todos');
        const { todoId } = request.params;
        const { title, description } = request.body;
        const updatedTodo = {
            $set: {
                title,
                description,
                updatedAt: new Date()
            }
        };
        await collection.updateOne({ _id: new ObjectId(todoId), userId: request.userId }, updatedTodo);
        response.status(200).send({ message: 'Todo updated successfully' });
    } catch (error) {
        response.status(500).send({ "Internal server error:": error });
    }
});

// Endpoint to delete a todo
app.delete('/todos/:todoId',  async (request, response) => {
    try {
        const collection = client.db('todo-app').collection('todos');
        const { todoId } = request.params;
        await collection.deleteOne({ _id: new ObjectId(todoId), userId: request.userId });
        response.status(200).send({ message: 'Todo deleted successfully' });
    } catch (error) {
        response.status(500).send({ "Internal server error:": error });
    }
});

module.exports = app; 