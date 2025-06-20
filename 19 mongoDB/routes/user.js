const express = require('express');
const {handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserById} = require("../controllers/user")
const router = express.Router();



// Routes
router.get("/",handleGetAllUsers);

router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

router.post("/", async (req, res) => {
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


modeule.export = router;