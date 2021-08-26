const express = require("express");
const mysql = require('mysql');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser')
const port = process.env.PORT || 3001;



// to parse the json object sent from the frontend
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library_database'
});

// connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql connected...");
});


// app.get("/", (req, res) => {
//     res.send('Hello World')
// });


// register admin
// app.get("/register", (req, res) => {
//     let cred = { email: "rajnishk@spanidea.com", password: "123456789", role: "admin" }
//     let sql = 'insert into registration set ?';
//     db.query(sql, cred, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send("Admin registered.....");
//     });
// });



// create a route to register the user

// let email = "j@gmail.com";
// let password = "123456";
// let role = "admin";
// let cred = { email: email, password: password, role: role };

// app.post('/register', (req, res) => {
//     console.log('inside register');
//     const email = req.body.email;
//     const password = req.body.password;
//     const role = req.body.role;

//     // console.log(role, email, password);

//     let sql = 'insert into registration set ?';
//     let cred = { email: email, password: password, role: role }
//     db.query(sql, cred, (err, result) => {
//         if (err) throw err;
//         console.log(err);
//         res.send('user registered successfully');
//     });

// });


//create a route for login 
app.post('/login', (req, res) => {
    console.log('inside login');
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    // console.log(role, email, password);

    let sql = 'select * from registration where email=? and password=? and role=?';

    db.query(sql, [email, password, role], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        // console.log(result);
        if (result.length > 0) {
            console.log(result);
        }
        else {
            console.log("wrong credentials");
        }
    });

});

app.listen(port, () => {
    console.log('server is running');
})