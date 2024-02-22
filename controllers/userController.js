const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Role = require('../models/globalModel')

const createUser = async (req, res) => {
    try {
        // Extract user data from the request body
        const { firstName, lastName, gender, email, password, role, phone } = req.body;

        fullName = firstName+ ' '+ lastName;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
          firstName,
          lastName,
          fullName,
          gender,
          email,
          password : hashedPassword,
          role ,
          phone,
        });

        return res.status(201).json({ success: true, 
            message: 'User created successfully', 
            data: newUser });
    } catch (error) {
        // Return error response if user creation fails
        return res.status(500).json({ success: false, error: error.message });
    }
}

const viewUser = async (req, res) => {
    try {
        const users = await User.find().populate({path:'role'})
        
        res.status(200).json({ 
            success: true, 
            data: users 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id , ...updatedData } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const userData = await User.findOne({email});
        if (!userData) {
            return res.status(404).json({ 
                success: false, 
                error: 'Email  is Incorrect' 
            });
        }
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
            return res.status(404).json({ 
                success: false, 
                error: 'Password is Incorrect' 
            });
        }

        const accessToken = jwt.sign(
            { userId: userData._id }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "1h" }
          );
          
        return res.status(200).json({
            success: true,
            accessToken,
            message: 'Login Successfully'
        })
        
    } catch (error) {
        res.json(
            {
                success: false,
                error: error.message
            }
        )
    }
}


module.exports = {
    login, createUser, viewUser
}