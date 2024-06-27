var express = require('express');
const mysqlPool = require('./config/db');

var app = express()

app.use("/api/v1/student", require("./routes/studentsRoutes.js"))

app.get('/', (req, res) => {
    res.send("<h1>list of XD</h1>");
});     

mysqlPool.query('SELECT 1').then(() => {
    console.log('MYSQL DB connected!')

app.listen(3000, () => {
    console.log(`Server Running on port 3000`)
});
}).catch((error) => {
    console.log(error);
});