const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")

// Fetching Routes
const adminRoute = require("./routes/adminRoute")

// TO GET  JSON DATA
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(session({
    key: "userId",
    secret: "subscribe", // must be largE nUmBER
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24, // Expires after 24 hour
    }
}))
// Routes MiddleWares
app.use("/admin", adminRoute)
app.get("/", (req,res)=>{
    res.send(`<h1>Nothing to Show</h1>`)
})


// Error page
app.use("*", (req, res) => {
    res.status(404).send(`No Page Found 404`);
})

module.exports = app;
