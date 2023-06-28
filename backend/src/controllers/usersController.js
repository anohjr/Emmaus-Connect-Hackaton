const {
  findAll,
  findOneUser,
  modifyOneUser,
  addUser,
  removeUser,
  findByMail,
} = require("./usersController");

const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const getAll = (req, res) => {
  findAll()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: "Server error" }));
};

const putOneUser = (req, res) => {
  const user = req.body;
  const id = req.params.id;

  modifyOneUser(user, id).then((result) => {
    if (result.affectedRows === 1) {
      res.json({ id, ...user });
    } else {
      res.status(404).json({ message: "No user found with this id !" });
    }
  });
};

const register = async (req, res) => {
  const user = req.body;

  try {
    const result = await findByMail(user.mail);
    console.log("Hello", result);
    if (result.length > 0) {
      res.status(409).send({
        error: " email already exist",
      });
    } else {
      const userNew = await addUser(user);
      res.status(201).json(userNew);
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getOneUser = (req, res) => {
  
  const id = parseInt(req.params.id);
 
  if (isNaN(id)) {
    res.status(400).json({ message: "wrong id type (getOne) !" });
  }

  findOneUser(id)
    .then(([data]) => {
      
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ message: "No user found with this id !!!" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Servor error" }));
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "wrong id type (delete)" });
  }
  removeUser(id)
    .then((result) => {
      if (result.affectedRows === 1) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "No user found with this id !" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Server error" }));
};

const login = async (req, res) => {
  const { mail, password } = req.body;

  try {
    const userLogin = await findByMail(mail);
    if (userLogin.length === 0) {
      res.status(403).send({
        error: "Invalid email",
      });
    } else {
      const { id, mail, isAdmin } = userLogin[0];
      const hash = userLogin[0].password;

      const checkPassword = await argon2.verify(hash, password);

      if (checkPassword) {
        const token = jwt.sign(
          { id: id, isAdmin: isAdmin },
          process.env.JWT_AUTH_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .send({
            id,
            mail,
            isAdmin,
          });
      } else {
        res.status(403).send({
          error: "Invalid password",
        });
      }
    }
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: err.message });
  }
};


const logout = (req, res) => {
   return res.clearCookie("access_token").sendStatus(200);
}

module.exports = {
  getAll,
  getOneUser,
  putOneUser,
  register,
  deleteUser,
  login,
  logout
};