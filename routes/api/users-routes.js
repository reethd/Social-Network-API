const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../../controllers/usersController");

router.route("/").get(getUsers).post(createNewUser);

router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// router.get("/", () => console.log("it worked!"));

module.exports = router;
