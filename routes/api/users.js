const express = require('express')
const router = express.Router()

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'it is work in users'
}))

module.exports = router