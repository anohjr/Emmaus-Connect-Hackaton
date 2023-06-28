const router = require("express").Router();

const {
  getAllPhone,
  getPhone,
  addPhone,
  deletePhone,
  editPhone,
} = require("../controllers/phoneController");

router.get("/", getAllPhone);
router.post("/", addPhone);
router.get("/:id", getPhone);
router.delete("/:id", deletePhone);
router.put("/:id", editPhone);

module.exports = router;
