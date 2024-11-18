const catchAsync = require("../utils/catchAsync");
const project = require('../db/models/project'); // Assuming you have a Project model

const createProject = catchAsync(async(req, res, next)=>{
    const body = req.body 
    const newProject = await project.create({
        title: body.title,
        productImage: body.productImage,
        price : body.price,
        shortDescription: body.shortDescription,
        description: body.description,
        productUrl: body.productUrl,
        category: body.category,
        tags: body.tags,
        createdBy: req.user.id,
    });

    return res.status(201).json({
        status: 'success',
        data: newProject,
    })
});

module.exports = {createProject}

