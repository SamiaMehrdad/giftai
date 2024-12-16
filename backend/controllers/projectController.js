const asyncHandler = require("express-async-handler");
const Project = require("../models/Project");

const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({ userId: req.user.id });
    res.json(projects);
});

const createProject = asyncHandler(async (req, res) => {
    const { name, data } = req.body;
    const project = await Project.create({ userId: req.user.id, name, data });
    res.status(201).json(project);
});

module.exports = { getProjects, createProject };
