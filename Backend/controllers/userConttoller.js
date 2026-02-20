//controller/userController.js 

const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).populate('role_id');

        if (user && (await bcrypt.compare(password, user.password_hash))) {
            res.json({
                _id: user._id,
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role_id.name,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
};

exports.registerUser = async (req, res, next) => {
    try {
        const{ first_name, last_name, email, password, role_id } = req.body;

        if (!first_name || !last_name || !email || !password || !role_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const role = await Role.findById(role_id);

        if (!role) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.create({
            first_name,
            last_name,
            email,
            password_hash: hashedPassword,
            role_id,
        });

        res.status(201).json({
            _id: user._id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: role.name,
        });
    } catch (error) {
        next(error);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const user = await User.find({is_deleted: false}).populate('role_id', 'role_name');
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('role_id', 'role_name');

        if (!user || user.is_deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || user.is_deleted) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optional: update password 
        if (req.body.password) {
            req.body.password_hash = await bcrypt.hash(req.body.password, 10);
            delete req.body.password;
        }

        //Optional: Update role 
        if (req.body.role_id) {
            const role = await Role.findById(req.body.role_id);
            if (!role) {
                return res.status(400).json({ message: 'Invalid role' });
            }
        }

        Object.assign(user, req.body);
        await user.save();

        res.json({
            _id: user._id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role_id.name,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || user.is_deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        user.is_deleted = true;
        await user.save();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};


