const express = require('express');
const {handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateUserById} = require("../controllers/user")
const router = express.Router();



// Routes
router.get("/",handleGetAllUsers);

router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

router.post("/",handleCreateUserById)


modeule.export = router;