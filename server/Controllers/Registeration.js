import mongoose from "mongoose";
import bcrypt from "bcrypt"
import User from "../Models/User.js";

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            location,
            occupation
        } = req.body


        console.log(firstName,
            lastName,
            email,
            picturePath,
            password,
            location,
            occupation)

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            views: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })

        const saveUser = await newUser.save()
        res.status(201).json(saveUser)
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
}