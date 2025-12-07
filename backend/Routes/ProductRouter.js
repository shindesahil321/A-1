 const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: "laptop",
            price: 50000
        },
        {
            name: "headphones",
            price: 5000
        },
        {
            name: "smartwatch",
            price: 15000
        }
    ])
});

module.exports = router;