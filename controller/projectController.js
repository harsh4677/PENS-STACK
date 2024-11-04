const catchAsync = require("../utils/catchAsync");

const createProject = catchAsync(async(req, res, next)=>{
    const body = req.body 
    const newProject = await project.create({
        titel: body.title,
        isFeatured: body.isFeatured,
        productImage: body.productImage,
        price : body.price,
        shortDescription: body.shortDescription,
        description: body.description,
        productUrl: production.productUrl,
        category: body.category,
        tags: body.tags,
        createdBy: 1,
    });

    return res.status(201).json({
        status: 'success',
        data: newProject,
    })
});

module.exports = {createProject}

