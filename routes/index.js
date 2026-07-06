const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!<br>For <strong>all users</strong>, go to <strong>/users</strong><br>or a <strong>single user</strong>, go to <strong>/users/:id</strong>');
});

router.use('/users', require('./users'));

module.exports = router;