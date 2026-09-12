const userModel = require("../model/userModel.js");
const bcrypt = require("bcrypt");
/**
 * CRUD
 * Create user (post)
 * Read user (get)
 * Update user (put)
 * Delete user (delete)
 */

// CREATE USER
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);
        const user = await userModel.create({ name, email, password: hashedPassword });

        return res.status(201).json({
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//login user
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Are you sure you have an account?" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        return res.status(200).json({
            message: "User logged in successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GENERAL GET
const getAllUsers = async (req, res) => {
    try {
        const getAll = await userModel.find();
        return res.status(200).json({
            message: "All users fetched successfully",
            data: getAll,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//SINGLE GET
const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const getSingle = await userModel.findById(id);
        if (!getSingle) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User fetched successfully",
            data: getSingle,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//UPDATE USER
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const update = await userModel.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true }
        );
    return res.status(200).json({
        message: "User updated successfully",
        data: update,
    });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}    

//DELETE USER
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await userModel.findByIdAndDelete(id);
        return res.status(200).json({
            message: "User deleted successfully",
            data: deleteUser,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}    

module.exports = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    loginUser
};