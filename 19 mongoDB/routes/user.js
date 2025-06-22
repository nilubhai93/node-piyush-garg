const express = require('express');
const { 
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUserById } = require("../controllers/user")

const router = express.Router();


router.route("/")
.get(handleGetAllUsers)
.post(handleCreateUserById);

 
router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)



module.export = router;

