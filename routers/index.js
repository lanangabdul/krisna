const router = require("express").Router();
const AuthRouter = require("./AuthRouter");

router.use("/api/v1/auth", AuthRouter);
router.get('/', (req, res) => {
    res.send('Hello World');
});


module.exports = router