const express = require('express');
const router = express.Router();



// Routes


router.get("/", async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

router.route("/:id")
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