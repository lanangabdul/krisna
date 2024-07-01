const router = require("express").Router();
const AuthRouter = require("./AuthRouter");

router.use("/api/v1/auth", AuthRouter);


module.exports = router