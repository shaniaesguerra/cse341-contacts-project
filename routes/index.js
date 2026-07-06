const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hello World!<br>For <strong>all contacts</strong>, go to <strong>/contacts</strong><br>or a <strong>single contact</strong>, go to <strong>/contacts/:id</strong>');
});

router.use('/contacts', require('./contacts'));

module.exports = router;