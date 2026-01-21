import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../server/models/User.js';

dotenv.config({ path: './server/.env' }); // Adjust path if needed

const makeAdmin = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/multiverse');
        console.log('MongoDB Connected');

        // Try to find an existing user to promote
        const user = await User.findOne({});

        if (user) {
            user.isAdmin = true;
            await user.save();
            console.log(`User ${user.email} is now an Admin.`);
        } else {
            // Create a default admin
            const adminUser = await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123', // Will be hashed by pre-save hook
                isAdmin: true
            });
            console.log(`Created new Admin User: ${adminUser.email} / password123`);
        }

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

makeAdmin();
