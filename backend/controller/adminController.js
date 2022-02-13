const mysql = require("mysql2")
const bcrypt = require("bcrypt")
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'gccc9X77',
    database: 'student_register',
});

exports.addStudent = (req, res) => {
    // Fetching Data from frontend
    const {
        stuname,
        age,
        gender,
        dep,
        phone,
        addmdate
    } = req.body;
    // Adding data in DataBase
    db.query('INSERT INTO student(stuname, age, gender, dep, phone, addmdate) VALUES(?,?,?,?,?,?)',
        [stuname, age, gender, dep, phone, addmdate], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(404).json({ status: "failed", })
            }
            else {
                res.status(200).json({ status: "success", });
            }
        }
    );
}

exports.viewStudent = (req, res) => {
    // Fetching selected Department
    const { dep } = req.body;

    db.query('SELECT * FROM student WHERE dep = ?', [dep], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(404).json({ status: "failed", })
        }
        else {
            res.status(200).json(result)
        }
    });
}

exports.viewStudentSpecific = (req, res) => {
    // Fetch Student ID
    const { stuID } = req.body;

    db.query('SELECT * FROM student WHERE sid = ?', [stuID], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(404).json({ status: "failed", })
        }
        else {
            res.status(200).json(result)
        }
    });
}

exports.deleteStudent = (req, res) => {
    const { sid } = req.params;

    db.query('DELETE FROM student WHERE sid = ?', [sid], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(404).json({ status: "failed", })
        }
        else {
            res.status(200).json({ status: "success" })
        }
    });
}

exports.updateStudent = (req, res) => {
    const { sid, newName } = req.body;
    db.query('UPDATE student SET stuname = ? WHERE sid = ?', [newName, sid], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(404).json({ status: "failed", })
        }
        else {
            console.log(result)
            res.status(200).json({ status: "success" })
        }
    })
}

exports.userLogin = (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * from users where userName = ?", [username], (err, result)=>{
        if(err) {
            console.log(err);
            return res.json({status: "failed"});
        }
        if (result.length > 0)
        {
            bcrypt.compare(password, result[0].upassword, (error, response) => {
                if (response) {
                    req.session.user = result;
                    return res.status(200).json({ status: "Success", message: `Hello ${result[0].userName}` })
                }
                else {
                    console.log(response)
                    return res.status(200).json({ status: "Login Failed", message: "Wrong Password" })
                }
            })
        }
        else {
            console.log("bbb")
            res.json({ message: "UserName doesnot exist" })
        }
    })
}