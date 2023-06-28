const {
  findAll,
  findOne,
  createPhone,
  removePhone,
  modifyPhone,
} = require("../models/userModel");

const getAllPhone = async (req, res) => {
  try {
    const datagetAllPhone = await findAll();

    if (datagetAllPhone.length !== 0) {
      res.status(200).json(datagetAllPhone);
    } else {
      res.status(404).json({ error: "No Phone" });
    }
  } catch (err) {
    console.error("err", err);
    res.status(500).json({ error: err.message });
  }
};

const addPhone = async (req, res) => {
  const phone = req.body;
  try {
    const dataAddPhone = await createPhone(phone);
    res.status(201).json(dataAddPhone);
  } catch (err) {
    console.error("err", err);
    res.status(500).json({ error: err.message });
  }
};

const getPhone = async (req, res) => {
  const { id } = req.params;
  try {
    const dataGetUser = await findOne(id);
    res.status(201).json(dataGetUser);
  } catch (err) {
    console.error("err", err);
    res.status(500).json({ error: err.message });
  }
};

const deletePhone = async (req, res) => {
  const { id } = req.params;
  try {
    const dataDeletePhone = await removePhone(id);
    if (dataDeletePhone.affectedRows === 1) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "No Phone found" });
    }
  } catch (err) {
    console.error("err", err);
    res.status(500).json({ error: err.message });
  }
};

const editPhone = async (req, res) => {
  const { id } = req.params;

  const phone = req.body;

  try {
    const dataEditPhone = await modifyPhone(phone, id);
    if (dataEditPhone.affectedRows === 1) {
      res.json({ id, ...phone });
    } else {
      res.status(404).json({ message: "No phone found" });
    }
  } catch (err) {
    console.error("err", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllPhone, getPhone, addPhone, deletePhone, editPhone };
