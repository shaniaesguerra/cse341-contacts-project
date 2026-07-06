const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
    res.send('For all users, go to /users and for a single user, go to /users/:id');
});

router.use('/users', require('./users'));

module.exports = router;