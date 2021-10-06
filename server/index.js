const express = require("express");
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const port = 3001;



// cross origin resource sharing  
//header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading of resources.

app.use(cors());

// to recognize the incoming Request Object as a JSON Object
app.use(express.json());


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

app.post('/register', (req, res) => {
    console.log('inside register');
    console.log(req);

    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    // console.log(role, email, password);



    // password hashing using bcrypt
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        let sql = 'insert into registration set ?';
        let cred = { email: email, password: hash, role: role }
        db.query(sql, cred, (err, result) => {
            if (err) throw err;
            res.send(result);

        });

    });


});


//create a route for login 
app.post('/login', (req, res) => {

    console.log('inside login');
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    // console.log(role, email, password);

    let sql = 'select * from registration where email=? and role=?';
    db.query(sql, [email, role], (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            // console.log(result);
            //now compare the passwords 
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    res.send(result);
                }
                else {
                    res.send({ message: 'Wrong email/password combination' })
                }
            });
        }
        else {
            console.log("user doesn't exist");
            res.send({ message: "user doesn't exist" });
        }
    });

});

app.listen(port, () => {
    console.log('server is running');
})