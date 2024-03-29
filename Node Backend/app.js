require('dotenv').config();
require('express-async-errors');
const express = require('express');
const authRouter = require('./Routes/Authentication');
const dataRouter = require('./Routes/Data');
const taskRouter = require('./Routes/Tasks');
const connectDB = require('./db/connect');
const app = express();

//To get data in json format!
app.use(express.json({ extended: false }));

app.use('/auth', authRouter);
app.use('/users', dataRouter);
app.use('/tasks', taskRouter);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(5000, () => {
            console.log('Server is Running on host 5000');
        });
    } catch (error) {
        console.log(error);
    }
}
start();