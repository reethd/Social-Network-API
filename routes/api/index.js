const router = require("express").Router();
const thoughtsRoutes = require("./thoughts-routes");
const usersRoutes = require("./users-routes");

router.use("/users", usersRoutes);
router.use("/thoughts", thoughtsRoutes);



module.exports = router;
