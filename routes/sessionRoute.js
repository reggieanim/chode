const express = require('express')
const router = express.Router()
const {sessionCreate, sessionOpen} = require('../controllers/sessionController')

router.post('/session_create', sessionCreate)
router.post('/session/:id', sessionOpen)

module.exports = router