const express = require('express');
const authRouter = require('./Routes/Authentication');
const app = express();


app.use('/compilance/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(5000, (req, res) => {
    console.log('Server is Running on host 5000');
});