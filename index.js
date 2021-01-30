var express = require("express");
var app = express();
var https = require("http").createServer(app);
var io = require("socket.io").listen(https);
var fs = require("fs")
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const path = require('path')
var session = require('express-session')
var mysql = require('mysql')
var dbquery = require("./obj/dbquery")
https.listen(process.env.PORT || 3000)
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
var dbConfig = {
    host: "b8qlmi0rrl6fqlz9g7xq-mysql.services.clever-cloud.com",
    user: "ulxhup08hubnlnlb",
    password: "56cWxVOzXaCCD5QmDQsr",
    database: "b8qlmi0rrl6fqlz9g7xq"
}

var connection;
function handleDisconnect() {
    connection = mysql.createConnection(dbConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 20000);
        }
    });
    connection.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            //throw err;
        }
    });
}

handleDisconnect();

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static("public"))
app.use(express.static('node_modules'))
app.use(session({
    secret: 'this-is-a-secret-token',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
    }
}));
app.get('/', function (req, res) {
    
    if (req.app.get("log")) {
        res.render("login2",{loger: req.app.get("log")})
    }
    else{
        res.render("login2",{loger: null})
    }
    
})
app.post("/login", (req, res) => {
    var username = req.body.username;
    var pass = req.body.password;
    dbquery.account.login(connection, username, pass, (rs) => {
        if (rs!=null) {
            req.app.set('log', null)
            req.session.user = rs[0];
            //res.json(rs);
            console.log(rs)
            res.redirect("/main");
        }
        else {
            req.app.set('log', "Sai tai khoan hoac mat khau")
            res.redirect("/");
        }

    });
});

app.get("/main",(req,res)=>{
    res.render("main")
})

app.get("/index",(req,res)=>{
    res.render("index")
})

app.post("/addmathang",(req,res)=>{

})

// data table render
app.get('/pages/tables/simple', function (req, res) {
    res.render("pages/tables/simple");
});

app.get('/pages/tables/data', function (req, res) {
    res.render("pages/tables/data");
});

app.get('/pages/tables/jsgrid', function (req, res) {
    res.render("pages/tables/jsgrid");
});
//-------------
// form render
app.get('/pages/forms/general', function (req, res) {
    res.render("pages/forms/themmathang");
});

app.get('/pages/forms/advance', function (req, res) {
    res.render("pages/forms/advance");
});

app.get('/pages/forms/editors', function (req, res) {
    res.render("pages/forms/editors");
});

app.get('/pages/forms/themnv', function (req, res) {
    res.render("pages/forms/themnhanvien");
});
//-------------------
io.on("connection", (socket) => {
    console.log("log_connect: " + socket.id)
})