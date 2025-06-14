const express = require('express');
const fs = require('fs');
const mongoose = require("mongoose");
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;


// connect to mongoose
mongoose.connect("mongodb://127.0.0.1:27017/piyush-db-1")
.then(()=>console.log("MongoDB Connected"))
.catch(err =>console.log("MOngo Error"));

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }

})

const User = mongoose.model("user",userSchema)

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    fs.appendFile(
        "log.txt",
        `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
        (err, data) => {
            next();
        }
    );
});

// Routes
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
});

app.get("/api/users", (req, res) => {
    res.setHeader("X-myName", "Piyush Garg"); // Custom Header
    // Always add X to custom headers
    return res.json(users);
});

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    })
    .patch((req, res) => {
        // Edit user with id
        return res.json({ status: "Pending" });
    })
    .delete((req, res) => {
        // Delete user with id
        return res.json({ status: "Pending" });
    });

app.post("/api/users",async (req, res) => {
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All fields are req..." });
    }
   const result = await User.create({
    firstName:body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    jobTitle:body.job_title,
   });
   
   console.log("result", result);

   return res.status(201).json({msg:"success"});
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));