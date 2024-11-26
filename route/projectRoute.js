const { authentication, retrictTo } = require('../controller/authController');
const { createProject, getAllProject, getProjectById, updateProject, deleteProject } = require('../controller/projectController')

const router = require('express').Router()

router
    .route('/projects')
    .post(authentication, retrictTo('1'), createProject)
    .get(authentication,  retrictTo('1'), getAllProject)

router
    .route('/projects/:id')
    .get(authentication, retrictTo('1'), getProjectById)
    .patch(authentication, retrictTo('1'), updateProject)
    .delete(authentication, retrictTo('1'), deleteProject);

module.exports = router;


