require('dotenv').config();
require('express-async-errors');
const express = require('express');
const authRouter = require('./Routes/Authentication');
const userRouter = require('./Routes/User');
const taskRouter = require('./Routes/Tasks');
const connectDB = require('./db/connect');
const app = express();

//To get data in json format!
app.use(express.json({ extended: false }));
app.use('/uploads', express.static('images'));

app.use('/auth', authRouter);
app.use('/users', userRouter);
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