const Project = require('../models/projectModel')

const createProject = async (req, res) => {
    try {
        const {
          title,
          milestone,
          projectManager,
          technology,
          startDate,
          work,
          members,
          duration,
          deal,
          client,
          priority,
          description,
        } = req.body;

        uniqueId = `PROJECT_${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`;

        const newProject = await Project.create({
            projectId : uniqueId,
            title,
            milestone,
            projectManager,
            technology,
            startDate,
            work,
            members,
            duration,
            deal,
            client,
            priority,
            description
        });
        const savedProject = await newProject.save();
        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: savedProject
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
    })
}}

const viewProject= async (req, res) => {
    try {
        const {id} = req.body;
        const projects = await Project.findById(id)
          .populate({ path: "projectManager" })
          .populate({ path: "members" })
          .populate({path: "client"});
        if (!projects ||!projects.status) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            })
        }
        res.status(200).json({
            success: true,
            data: projects
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const updateProject = async (req, res) => {
    try {
        const {id, ...updateData} = req.body;
        const updatedProject = await Project.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        if (!updatedProject || !updatedProject.status) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: updatedProject
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const deleteProject = async (req, res) => {
    try {
        const {id} = req.body;
        const deletedProject = await Project.findById(id);
        if (!deletedProject || !deletedProject.status) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            })
        }
        //mark as deleted
        deletedProject.status = false
        await deletedProject.save();
        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {createProject, viewProject, updateProject, deleteProject};