const { createProject } = require('../controller/projectController')

const router = require('express').Router()

router.route('/projects').post(createProject)

module.exports = router;


