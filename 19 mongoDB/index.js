const express = require('express');
const fs = require('fs');
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;


// connect to mongoose
mongoose.connect("mongodb://127.0.0.1:27017/piyush-db-1")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MOngo Error"));

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
},{timestamps:true}
);

const User = mongoose.model("user", userSchema)






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
app.get("/users", async(req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName}-${user.email}</li>`).join("")}
    </ul>`;
    res.send(html);
});

app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

app.route("/api/users/:id")
    .get(async(req, res) => {
        const user = await User.findById(req.params.id);if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    })
    .patch(async(req, res) => {
        // Edit user with id
        await User.findByIdAndUpdate(req.params.id,{lastName:"changed"})
        return res.json({ status: "success" });
    })
    .delete(async(req, res) => {
        // Delete user with id
        await User.findOneAndDelete(req.params.id)
        return res.json({ status: "success to delete" });
    });

app.post("/api/users", async (req, res) => {
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
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });


    return res.status(201).json({ msg: "success" });
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));