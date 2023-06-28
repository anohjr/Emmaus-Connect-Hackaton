const router = require("express").Router();

const { getAllPhone, getPhone, addUser, deletePhone, editPhone } = require("../controller/phoneController.js");

router.get("/", getAllPhone);
router.post("/", validateUserPost, addUser);
router.get("/:id", getPhone);
router.delete("/:id", deletePhone);
router.put("/:id", editPhone);

module.exports = router;