const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path')
const http = require('http');
const jwt = require('jsonwebtoken');


const app = express()
dotenv.config();
const db = require("./src/models")
const server = http.createServer(app);



const users = require("./src/routes/users.routes.js");
const auth = require("./src/routes/users.auth.routes.js");


app.use(logger('dev'))
app.use(logger('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))


app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: '*',
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
}));


const { JWT_SECRET } = process.env;
// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(token);
    if (!token) {
        return res.status(403).json({ message: "Unauthorised!" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Unauthorised!" });
        }
        console.log('success ');
        req.user = user;
        next();
    });
}

app.get("/", (req, res) => {
    res.send("<h2>Probase Practical Assessment Running!</h2>");
})



//database config
db.sequelize.sync({ alter: true })
    .then(() => console.log("Database connected.."))
    .catch(err => console.log('Error: ' + err))



app.use('/api/user', authenticateToken, users)
app.use('/api/auth', auth)

port = process.env.PORT || 5001;
server.listen(port, (req, res) => {
    console.log(`Server listening on ${port}`)
});
